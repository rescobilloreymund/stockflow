import { Product } from "@/types/product";
import { useEffect } from "react";
import { productToFormData } from "@/utils/mappers/products/product-form.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, ProductFormData } from "@/schemas/product.schema";

const initialForm: ProductFormData = {
  name: "",
  sku: "",
  categoryId: 0,
  supplierId: 0,
  cost: 0,
  price: 0,
  status: "ACTIVE",
};

interface UseProductFormProps {
  editingProduct: Product | null;
}

export function useProductForm({ editingProduct }: UseProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: editingProduct
      ? productToFormData(editingProduct)
      : initialForm,
  });

  useEffect(() => {
    form.reset(
      editingProduct ? productToFormData(editingProduct) : initialForm,
    );
  }, [editingProduct, form]);

  return form;
}
