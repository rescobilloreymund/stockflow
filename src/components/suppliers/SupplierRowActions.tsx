import { Supplier } from "@/types/supplier";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { useState } from "react";
interface SupplierRowActionsProps {
  supplier: Supplier;

  onEdit: (supplier: Supplier) => void;

  onDelete: (id: number) => Promise<void>;
}

export default function SupplierRowActions({
  supplier,
  onEdit,
  onDelete,
}: SupplierRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open supplier actions"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onEdit(supplier)}>
              <PencilIcon className="size-4" />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <TrashIcon className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        title="Delete Supplier"
        description={`Are you sure you want to delete "${supplier.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => onDelete(supplier.id)}
      />
    </>
  );
}
