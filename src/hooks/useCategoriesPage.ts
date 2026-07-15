import { useState } from "react";

import { CategoryApi } from "@/api/categories.api";

import {
  Category,
  GetCategoriesRequest,
  GetCategoriesResponse,
  CategorySortField,
} from "@/types/category";
import { useDebounce } from "./useDebounce";
import { toast } from "sonner";
import { toggleSortDirection } from "@/utils/common.helper";
import { PageSize } from "@/types/common";
import { EMPTY_PAGINATION } from "@/constants/pagination";
import { CategoryFormData } from "@/schemas/category.schema";
import { toRequest } from "@/utils/mappers/categories/category-request";

const categoryApi = new CategoryApi();

export function useCategoriesPage() {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [query, setQuery] = useState<GetCategoriesRequest>({
    search: "",

    page: 1,
    pageSize: 10,

    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const debouncedSearch = useDebounce(query.search);

  const [categoriesResult, setCategoriesResult] =
    useState<GetCategoriesResponse | null>(null);
  const categories = categoriesResult?.data ?? [];
  const pagination = categoriesResult?.meta ?? EMPTY_PAGINATION;

  // derived states
  const hasFilters: boolean = query.search?.trim() != "";
  const hasCategories: boolean = pagination.totalItems > 0;
  const isFirstTime: boolean = pagination.totalItems === 0 && !hasFilters;
  const isEmptySearchResult: boolean = !hasCategories && hasFilters;
  const shouldShowToolbar: boolean =
    isLoadingCategories || hasCategories || hasFilters;
  const shouldShowPagination: boolean =
    hasCategories || pagination.totalItems > 0;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  async function loadCategories() {
    try {
      setIsLoadingCategories(true);
      const response = await categoryApi.getCategories(buildCategoryQuery());

      if (
        response.meta.totalPages > 0 &&
        response.meta.page > response.meta.totalPages
      ) {
        setQuery((prev) => ({ ...prev, page: response.meta.page - 1 }));

        return;
      }

      setCategoriesResult(response);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }
  // crud
  async function handleAddCategory(category: CategoryFormData) {
    try {
      await categoryApi.createCategory(toRequest(category));
      await loadCategories();

      toast.success("Category created successfully");
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category");
      throw error;
    }
  }

  async function handleUpdateCategory(category: CategoryFormData) {
    if (!editingCategory) return;
    try {
      await categoryApi.updateCategory(editingCategory.id, toRequest(category));
      await loadCategories();
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category");

      throw error;
    }
  }

  async function handleDeleteCategory(id: number) {
    try {
      await categoryApi.deleteCategory(id);
      await loadCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
      throw error;
    }
  }

  function handleEditCategory(category: Category) {
    setEditingCategory(category);
    setIsDialogOpen(true);
  }

  function handleAddCategoryClick() {
    handleDialogChange(true);
  }

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open);

    if (!open) {
      setEditingCategory(null);
    }
  }

  function handleSearchChange(value: string) {
    // Temporary: set loading immediately to prevent skeleton flicker.
    // Remove once the backend returns paginated metadata and loading
    // is driven entirely by the request lifecycle.
    setIsLoadingCategories(true);
    setQuery((prev) => ({ ...prev, search: value, page: 1 }));
  }

  function handlePageChange(page: number) {
    setIsLoadingCategories(true);
    setQuery((prev) => ({ ...prev, page }));
  }

  function handleSort(field: CategorySortField) {
    setIsLoadingCategories(true);
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
    setIsLoadingCategories(true);
    setQuery((prev) => ({ ...prev, pageSize, page: 1 }));
  }

  function buildCategoryQuery(): GetCategoriesRequest {
    return {
      ...query,
      search: debouncedSearch || undefined,
    };
  }

  return {
    loadCategories,

    categories,
    pagination,

    query,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    debouncedSearch,

    editingCategory,

    handleAddCategoryClick,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    isDialogOpen,
    handleEditCategory,

    isLoadingCategories,
    handleDialogChange,

    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  };
}
