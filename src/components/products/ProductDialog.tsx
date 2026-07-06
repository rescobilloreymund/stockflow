import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "@/components/products/ProductForm";
import { Product, CreateProductRequest } from "@/types/product";
import { Category } from "@/types/category";
import { Supplier } from "@/types/supplier";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: Category[];
  suppliers: Supplier[];
  onSubmit: (product: CreateProductRequest) => Promise<void>;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
  categories,
  suppliers,
  onSubmit,
}: ProductDialogProps) {
  async function handleSubmit(data: CreateProductRequest) {
    await onSubmit(data);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <ProductForm
          categories={categories}
          suppliers={suppliers}
          onSubmit={handleSubmit}
          editingProduct={product}
        />
      </DialogContent>
    </Dialog>
  );
}
