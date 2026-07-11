import { SortDirection } from "@/types/common";

export function toggleSortDirection(
  sortDirection: SortDirection,
): SortDirection {
  return sortDirection === "asc" ? "desc" : "asc";
}

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}
