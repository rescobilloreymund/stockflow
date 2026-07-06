import { PAGE_SIZES } from "@/constants/pagination";

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type PageSize = (typeof PAGE_SIZES)[number];

export type SortDirection = "asc" | "desc";
