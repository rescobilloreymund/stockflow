import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/categories/CategoryForm";
import { Category, CreateCategoryRequest } from "@/types/category";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onSubmit: (category: CreateCategoryRequest) => Promise<void>;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
  onSubmit,
}: CategoryDialogProps) {
  async function handleSubmit(data: CreateCategoryRequest) {
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
