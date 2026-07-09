import { ProductFormData } from "@/schemas/product.schema";
import { CreateProductRequest } from "@/types/product";

export function toRequest(form: ProductFormData): CreateProductRequest {
  return {
    ...form,
  };
}
