import { Supplier } from "@/types/supplier";
import { TableRow, TableCell } from "@/components/ui/table";
import SupplierRowActions from "./SupplierRowActions";
import {
  formatDate,
  formatShortDate,
  formatTime,
} from "@/utils/formatters/date.formatter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/common.helper";
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
    <TableRow className="hover:bg-muted/40 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 font-medium">
            <AvatarFallback className="text-sm font-medium">
              {getInitials(supplier.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="font-medium truncate">{supplier.name}</p>

            <p className="text-sm text-muted-foreground">Supplier</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{supplier.contactName}</p>

          <p className="text-sm text-muted-foreground">Primary Contact</p>
        </div>
      </TableCell>
      <TableCell>{supplier.phone}</TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{formatShortDate(supplier.createdAt)}</p>

          <p className="text-sm text-muted-foreground">
            {formatTime(supplier.createdAt)}
          </p>
        </div>
      </TableCell>
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
