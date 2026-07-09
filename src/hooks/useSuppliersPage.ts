import { useState } from "react";

import { SupplierApi } from "@/api/suppliers.api";

import {
  Supplier,
  GetSuppliersRequest,
  GetSuppliersResponse,
  SupplierSortField,
  SuppliersPageQuery,
} from "@/types/supplier";
import { useDebounce } from "./useDebounce";
import { toast } from "sonner";
import { toggleSortDirection } from "@/utils/common.helper";
import { PageSize } from "@/types/common";
import { SupplierFormData } from "@/schemas/supplier.schema";
import { toRequest } from "@/utils/mappers/suppliers/supplier-request.mapper";
import { EMPTY_PAGINATION } from "@/constants/pagination";

const supplierApi = new SupplierApi();

export function useSuppliersPage() {
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);

  const [query, setQuery] = useState<SuppliersPageQuery>({
    search: "",

    page: 1,
    pageSize: 10,

    sortBy: "createdAt",
    sortDirection: "desc",
  });

  const debouncedSearch = useDebounce(query.search);

  const [suppliersResult, setSuppliersResult] =
    useState<GetSuppliersResponse | null>(null);
  const suppliers = suppliersResult?.data ?? [];
  const pagination = suppliersResult?.meta ?? EMPTY_PAGINATION;

  // derived states
  const hasFilters: boolean = query.search?.trim() != "";
  const hasSuppliers: boolean = pagination.totalItems > 0;
  const isFirstTime: boolean = pagination.totalItems === 0 && !hasFilters;
  const isEmptySearchResult: boolean = !hasSuppliers && hasFilters;
  const shouldShowToolbar: boolean =
    isLoadingSuppliers || hasSuppliers || hasFilters;
  const shouldShowPagination: boolean =
    hasSuppliers || pagination.totalItems > 0;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  async function loadSuppliers() {
    try {
      setIsLoadingSuppliers(true);
      const response = await supplierApi.getSuppliers(buildSupplierQuery());

      if (
        response.meta.totalPages > 0 &&
        response.meta.page > response.meta.totalPages
      ) {
        setQuery((prev) => ({ ...prev, page: response.meta.page - 1 }));

        return;
      }

      setSuppliersResult(response);
    } catch (error) {
      console.error("Failed to load suppliers:", error);
    } finally {
      setIsLoadingSuppliers(false);
    }
  }

  // crud
  async function handleAddSupplier(supplier: SupplierFormData) {
    try {
      await supplierApi.createSupplier(toRequest(supplier));
      await loadSuppliers();

      toast.success("Supplier created successfully");
    } catch (error) {
      console.error("Failed to create supplier:", error);
      toast.error("Failed to create supplier");
      throw error;
    }
  }

  async function handleUpdateSupplier(supplier: SupplierFormData) {
    if (!editingSupplier) return;
    try {
      await supplierApi.updateSupplier(editingSupplier.id, toRequest(supplier));
      await loadSuppliers();
      toast.success("Supplier updated successfully");
    } catch (error) {
      console.error("Failed to update supplier:", error);
      toast.error("Failed to update supplier");

      throw error;
    }
  }

  async function handleDeleteSupplier(id: number) {
    try {
      await supplierApi.deleteSupplier(id);
      await loadSuppliers();
      toast.success("Supplier deleted successfully");
    } catch (error) {
      console.error("Failed to delete supplier:", error);
      toast.error("Failed to delete supplier");
      throw error;
    }
  }

  function handleEditSupplier(supplier: Supplier) {
    setEditingSupplier(supplier);
    setIsDialogOpen(true);
  }

  function handleAddSupplierClick() {
    handleDialogChange(true);
  }

  function handleDialogChange(open: boolean) {
    setIsDialogOpen(open);

    if (!open) {
      setEditingSupplier(null);
    }
  }

  function handleSearchChange(value: string) {
    // Temporary: set loading immediately to prevent skeleton flicker.
    // Remove once the backend returns paginated metadata and loading
    // is driven entirely by the request lifecycle.
    setIsLoadingSuppliers(true);
    setQuery((prev) => ({ ...prev, search: value, page: 1 }));
  }

  function handlePageChange(page: number) {
    setIsLoadingSuppliers(true);
    setQuery((prev) => ({ ...prev, page }));
  }

  function handleSort(field: SupplierSortField) {
    setIsLoadingSuppliers(true);
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
    setIsLoadingSuppliers(true);
    setQuery((prev) => ({ ...prev, pageSize, page: 1 }));
  }

  function buildSupplierQuery(): GetSuppliersRequest {
    return {
      ...query,
      search: debouncedSearch || undefined,
    };
  }

  return {
    suppliers,
    pagination,
    query,

    editingSupplier,
    isDialogOpen,

    isLoadingSuppliers,

    loadSuppliers,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    debouncedSearch,
    handleAddSupplierClick,
    handleAddSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,
    handleEditSupplier,
    handleDialogChange,

    isFirstTime,
    isEmptySearchResult,
    shouldShowToolbar,
    shouldShowPagination,
  };
}
