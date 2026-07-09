import { CategoryFormData } from "@/schemas/category.schema";
import { CreateCategoryRequest } from "@/types/category";

export function toRequest(form: CategoryFormData): CreateCategoryRequest {
  return {
    ...form,
  };
}
