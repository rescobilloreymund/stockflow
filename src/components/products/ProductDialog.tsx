import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "@/components/products/ProductForm";
import { Product } from "@/types/product";
import { CategoryOption } from "@/types/category";
import { SupplierOption } from "@/types/supplier";
import { ProductFormData } from "@/schemas/product.schema";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: CategoryOption[];
  suppliers: SupplierOption[];
  onSubmit: (product: ProductFormData) => Promise<void>;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
  categories,
  suppliers,
  onSubmit,
}: ProductDialogProps) {
  async function handleSubmit(data: ProductFormData) {
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
