import { Category } from "@/types/category";
import { useEffect } from "react";
import { categoryToFormData } from "@/utils/mappers/categories/category-form.mapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryFormData,
  createCategorySchema,
} from "@/schemas/category.schema";

const initialForm: CategoryFormData = {
  name: "",
};

interface UseCategoryFormProps {
  editingCategory: Category | null;
}

export function useCategoryForm({ editingCategory }: UseCategoryFormProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: editingCategory
      ? categoryToFormData(editingCategory)
      : initialForm,
  });

  useEffect(() => {
    form.reset(
      editingCategory ? categoryToFormData(editingCategory) : initialForm,
    );
  }, [editingCategory, form]);

  return form;
}
