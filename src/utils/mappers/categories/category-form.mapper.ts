import { Category } from "@/types/category";

export function categoryToFormData(category: Category) {
  return {
    name: category.name,
  };
}
