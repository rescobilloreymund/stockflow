import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/categories/CategoryForm";
import { Category } from "@/types/category";
import { CategoryFormData } from "@/schemas/category.schema";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSubmit: (category: CategoryFormData) => Promise<void>;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryDialogProps) {
  async function handleSubmit(data: CategoryFormData) {
    await onSubmit(data);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <CategoryForm onSubmit={handleSubmit} editingCategory={category} />
      </DialogContent>
    </Dialog>
  );
}
