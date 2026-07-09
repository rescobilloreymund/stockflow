import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SupplierForm from "@/components/suppliers/SupplierForm";
import { Supplier } from "@/types/supplier";
import { SupplierFormData } from "@/schemas/supplier.schema";

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: Supplier | null;
  onSubmit: (supplier: SupplierFormData) => Promise<void>;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  supplier,
  onSubmit,
}: SupplierDialogProps) {
  async function handleSubmit(data: SupplierFormData) {
    await onSubmit(data);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {supplier ? "Edit Supplier" : "Add Supplier"}
          </DialogTitle>
        </DialogHeader>

        <SupplierForm onSubmit={handleSubmit} editingSupplier={supplier} />
      </DialogContent>
    </Dialog>
  );
}
