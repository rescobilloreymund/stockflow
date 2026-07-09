import { Supplier, SupplierSortField } from "@/types/supplier";
import { Table, TableBody } from "@/components/ui/table";
import SuppliersTableHeader from "./SuppliersTableHeader";
import SuppliersTableColGroup from "./SuppliersTableColGroup";
import SupplierRow from "./SupplierRow";
import { SortDirection } from "@/types/common";

interface SuppliersTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => Promise<void>;
  sortBy: SupplierSortField;
  sortDirection: SortDirection;
  onSort: (field: SupplierSortField) => void;
}

export default function SuppliersTable({
  suppliers,
  onEdit,
  onDelete,
  sortBy,
  sortDirection,
  onSort,
}: SuppliersTableProps) {
  return (
    <Table className="w-full table-fixed">
      <SuppliersTableColGroup />

      <SuppliersTableHeader
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      <TableBody>
        {suppliers.map((supplier) => (
          <SupplierRow
            key={supplier.id}
            supplier={supplier}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
