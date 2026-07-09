import { Supplier } from "@/types/supplier";
import { TableRow, TableCell } from "@/components/ui/table";
import SupplierRowActions from "./SupplierRowActions";
import { formatDate } from "@/utils/formatters/date.formatter";
interface SupplierRowProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function SupplierRow({
  supplier,
  onEdit,
  onDelete,
}: SupplierRowProps) {
  return (
    <TableRow>
      <TableCell>{supplier.name}</TableCell>
      <TableCell>{supplier.contactName}</TableCell>
      <TableCell>{supplier.phone}</TableCell>
      <TableCell>{formatDate(supplier.createdAt)}</TableCell>
      <TableCell className="text-center">
        <SupplierRowActions
          supplier={supplier}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
