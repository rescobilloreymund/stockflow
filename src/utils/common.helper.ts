import { SortDirection } from "@/types/common";

export function toggleSortDirection(
  sortDirection: SortDirection,
): SortDirection {
  return sortDirection === "asc" ? "desc" : "asc";
}
