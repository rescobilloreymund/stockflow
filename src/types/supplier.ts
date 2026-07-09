import { PageSize, PaginationMeta, SortDirection } from "./common";

export interface Supplier {
  id: number;
  name: string;
  contactName: string;
  address: string;
  email?: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type SupplierSortField = "name" | "createdAt";

export interface GetSuppliersResponse {
  data: Supplier[];
  meta: PaginationMeta;
}

export interface GetSuppliersRequest {
  search?: string;

  page: number;
  pageSize: number;

  sortBy: SupplierSortField;
  sortDirection: SortDirection;
}

export interface SuppliersPageQuery {
  search: string;

  page: number;
  pageSize: PageSize;

  sortBy: SupplierSortField;
  sortDirection: SortDirection;
}

export interface CreateSupplierRequest {
  name: string;
  contactName: string;
  address: string;
  email?: string;
  phone: string;
}

export interface UpdateSupplierRequest {
  name: string;
  contactName: string;
  address: string;
  email?: string;
  phone: string;
}

export interface SupplierOption {
  id: number;
  name: string;
}
