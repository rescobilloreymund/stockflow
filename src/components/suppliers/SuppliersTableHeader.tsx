import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { SortDirection } from "@/types/common";
import { SupplierSortField } from "@/types/supplier";
import SortableHeader from "@/components/shared/SortableHeader";

interface SuppliersTableHeaderProps {
  sortBy: SupplierSortField;
  sortDirection: SortDirection;
  onSort: (field: SupplierSortField) => void;
}

export default function SuppliersTableHeader({
  sortBy,
  sortDirection,
  onSort,
}: SuppliersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <SortableHeader
            label="Supplier"
            isActive={sortBy === "name"}
            direction={sortDirection}
            onClick={() => onSort("name")}
          />
        </TableHead>
        <TableHead>Contact</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>
          <SortableHeader
            label="Created"
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
