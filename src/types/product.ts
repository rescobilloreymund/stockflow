import { Category } from "./category";
import { Supplier } from "./supplier";
import { PageSize, PaginationMeta, SortDirection } from "./common";

export const PRODUCT_STATUSES = ["ACTIVE", "INACTIVE", "DISCONTINUED"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];
export type ProductStatusFilter = ProductStatus | "all";
export interface Product {
  id: number;
  name: string;
  sku: string;
  categoryId: number;
  supplierId: number;
  cost: number;
  price: number;
  // quantity: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProductSortField = "name" | "price" | "createdAt";

export interface GetProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}

export interface ProductWithRelations extends Product {
  category: Category;
  supplier: Supplier;
}

export interface GetProductsRequest {
  search?: string;
  categoryId?: number;
  status?: ProductStatus;

  page: number;
  pageSize: number;

  sortBy: ProductSortField;
  sortDirection: SortDirection;
}

export interface ProductsPageQuery {
  search: string;
  categoryId: number;

  status: ProductStatusFilter;

  page: number;
  pageSize: PageSize;

  sortBy: ProductSortField;
  sortDirection: SortDirection;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  categoryId: number;
  supplierId: number;
  cost: number;
  price: number;
  status: ProductStatus;
}

export interface UpdateProductRequest {
  name: string;
  sku: string;
  categoryId: number;
  supplierId: number;
  cost: number;
  price: number;
  status: ProductStatus;
}
