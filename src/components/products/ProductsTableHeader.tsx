import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { SortDirection } from "@/types/common";
import { ProductSortField } from "@/types/product";
import SortableHeader from "@/components/shared/SortableHeader";

interface ProductsTableHeaderProps {
  sortBy: ProductSortField;
  sortDirection: SortDirection;
  onSort: (field: ProductSortField) => void;
}

export default function ProductsTableHeader({
  sortBy,
  sortDirection,
  onSort,
}: ProductsTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <SortableHeader
            label="Product"
            isActive={sortBy === "name"}
            direction={sortDirection}
            onClick={() => onSort("name")}
          />
        </TableHead>
        <TableHead className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </TableHead>
        <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <SortableHeader
            label="Price"
            isActive={sortBy === "price"}
            direction={sortDirection}
            onClick={() => onSort("price")}
          />
        </TableHead>
        <TableHead className="text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
