import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { SortDirection } from "@/types/common";
import { CategorySortField } from "@/types/category";
import SortableHeader from "@/components/shared/SortableHeader";

interface CategoriesTableHeaderProps {
  sortBy: CategorySortField;
  sortDirection: SortDirection;
  onSort: (field: CategorySortField) => void;
}

export default function CategoriesTableHeader({
  sortBy,
  sortDirection,
  onSort,
}: CategoriesTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <SortableHeader
            label="Category"
            isActive={sortBy === "name"}
            direction={sortDirection}
            onClick={() => onSort("name")}
          />
        </TableHead>
        <TableHead>
          <SortableHeader
            label="Date Created"
            isActive={sortBy === "createdAt"}
            direction={sortDirection}
            onClick={() => onSort("createdAt")}
          />
        </TableHead>

        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
