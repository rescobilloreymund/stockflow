import { Category } from "./category";
import { Supplier } from "./supplier";
import { PaginationMeta, SortDirection } from "./common";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "DISCONTINUED";

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

export type ProductSortField = "name" | "price" | "cost" | "createdAt";

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

  page: number;
  pageSize: number;

  sortBy?: ProductSortField;
  sortDirection?: SortDirection;
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
