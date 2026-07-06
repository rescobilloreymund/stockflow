import { Product } from "@/types/product";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MoreHorizontal,
  PencilIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { useState } from "react";
interface ProductRowActionsProps {
  product: Product;

  onEdit: (product: Product) => void;

  onDelete: (id: number) => Promise<void>;
}

export default function ProductRowActions({
  product,
  onEdit,
  onDelete,
}: ProductRowActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open product actions">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onEdit(product)}>
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
        title="Delete Product"
        description={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => onDelete(product.id)}
      />
    </>
  );
}
