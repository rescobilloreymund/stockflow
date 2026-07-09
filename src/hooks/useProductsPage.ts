import { useState } from "react";

import { CategoryApi } from "@/api/categories.api";
import { ProductApi } from "@/api/products.api";
import { SupplierApi } from "@/api/suppliers.api";

import { Category, CategoryOption } from "@/types/category";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  ProductSortField,
  ProductsPageQuery,
  ProductStatusFilter,
} from "@/types/product";
import { Supplier, SupplierOption } from "@/types/supplier";
import { useDebounce } from "./useDebounce";
import { toast } from "sonner";
import { toggleSortDirection } from "@/utils/common.helper";
import { PageSize } from "@/types/common";
import { EMPTY_PAGINATION } from "@/constants/pagination";

const categoryApi = new CategoryApi();
const productApi = new ProductApi();
const supplierApi = new SupplierApi();

export function useProductsPage() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [query, setQuery] = useState<ProductsPageQuery>({
    search: "",
    categoryId: 0,
    status: undefined,

    page: 1,
    pageSize: 10,

    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const debouncedSearch = useDebounce(query.search);

  // categories and suppliers are loaded on demand
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);

  // products are loaded on demand
  const [productsResult, setProductsResult] =
    useState<GetProductsResponse | null>(null);
  const products = productsResult?.data ?? [];
  const pagination = productsResult?.meta ?? EMPTY_PAGINATION;

  // derived states
  const hasFilters: boolean =
    query.search?.trim() != "" || query.categoryId !== 0;
  const hasProducts: boolean = pagination.totalItems > 0;
  const isFirstTime: boolean = pagination.totalItems === 0 && !hasFilters;
  const isEmptySearchResult: boolean = !hasProducts && hasFilters;
  const shouldShowToolbar: boolean =
    isLoadingProducts || hasProducts || hasFilters;
  const shouldShowPagination: boolean =
    hasProducts || pagination.totalItems > 0;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  async function loadCategories() {
    const data = await categoryApi.getCategoryOptions();
    setCategories(data);
  }

  async function loadSuppliers() {
    const data = await supplierApi.getSupplierOptions();
    setSuppliers(data);
  }

  async function loadProducts() {
    try {
      setIsLoadingProducts(true);
      const response = await productApi.getProducts(buildProductQuery());

      if (
        response.meta.totalPages > 0 &&
        response.meta.page > response.meta.totalPages
      ) {
        setQuery((prev) => ({ ...prev, page: response.meta.page - 1 }));

        return;
      }

      setProductsResult(response);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  }

  async function loadReferenceData() {
    try {
      await Promise.all([loadCategories(), loadSuppliers()]);
    } catch (error) {
      console.error("Failed to initialize products page:", error);
    }
  }

  // crud
  async function handleAddProduct(product: CreateProductRequest) {
    try {
      await productApi.createProduct(product);
      await loadProducts();

      toast.success("Product created successfully");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
      throw error;
    }
  }

  async function handleUpdateProduct(product: UpdateProductRequest) {
    if (!editingProduct) return;
    try {
      await productApi.updateProduct(editingProduct.id, product);
      await loadProducts();
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");

      throw error;
    }
  }

  async function handleDeleteProduct(id: number) {
    try {
      await productApi.deleteProduct(id);
      await loadProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
      throw error;
    }
  }

  function handleEditProduct(product: Product) {
    setEditingProduct(product);
    setIsDialogOpen(true);
  }

  function handleAddProductClick() {
    handleDialogChange(true);
  }

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open);

    if (!open) {
      setEditingProduct(null);
    }
  }

  function handleSearchChange(value: string) {
    // Temporary: set loading immediately to prevent skeleton flicker.
    // Remove once the backend returns paginated metadata and loading
    // is driven entirely by the request lifecycle.
    setIsLoadingProducts(true);
    setQuery((prev) => ({ ...prev, search: value, page: 1 }));
  }

  function handleCategoryChange(value: number) {
    // Temporary: set loading immediately to prevent skeleton flicker.
    // Remove once the backend returns paginated metadata and loading
    // is driven entirely by the request lifecycle.
    setIsLoadingProducts(true);
    setQuery((prev) => ({ ...prev, categoryId: value, page: 1 }));
  }

  function handlePageChange(page: number) {
    setIsLoadingProducts(true);
    setQuery((prev) => ({ ...prev, page }));
  }
  function handleStatusChange(value: ProductStatusFilter) {
    setIsLoadingProducts(true);
    setQuery((prev) => ({ ...prev, status: value, page: 1 }));
  }

  function handleSort(field: ProductSortField) {
    setIsLoadingProducts(true);
    setQuery((prev) => {
      if (prev.sortBy === field) {
        return {
          ...prev,
          sortDirection: toggleSortDirection(prev.sortDirection),
          page: 1,
        };
      }

      return {
        ...prev,
        sortBy: field,
        sortDirection: "asc",
        page: 1,
      };
    });
  }

  function handlePageSizeChange(pageSize: PageSize) {
    setIsLoadingProducts(true);
    setQuery((prev) => ({ ...prev, pageSize, page: 1 }));
  }

  function buildProductQuery(): GetProductsRequest {
    return {
      ...query,
      search: debouncedSearch || undefined,
      status: query.status,
      categoryId:
        query.categoryId && query.categoryId > 0 ? query.categoryId : undefined,
    };
  }

  return {
    loadReferenceData,

    loadProducts,

    products,
    pagination,

    categories,
    suppliers,

    query,
    handleSearchChange,
    handleCategoryChange,
    handlePageChange,
    handlePageSizeChange,
    handleStatusChange,
    handleSort,
    debouncedSearch,

    editingProduct,

    handleAddProductClick,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,

    isDialogOpen,
    handleEditProduct,

    isLoadingProducts,
    handleDialogChange,

    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  };
}
