import { PageSize, PaginationMeta, SortDirection } from "./common";
import { Product } from "./product";

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type CategorySortField = "name" | "createdAt";

export interface GetCategoriesResponse {
  data: Category[];
  meta: PaginationMeta;
}

export interface GetCategoriesRequest {
  search?: string;

  page: number;
  pageSize: number;

  sortBy: CategorySortField;
  sortDirection: SortDirection;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name: string;
}
