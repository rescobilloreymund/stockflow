import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { useCategoryForm } from "@/hooks/useCategoryForm";
import { Category, CreateCategoryRequest } from "@/types/category";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";

interface CategoryFormProps {
  defaultValues?: CreateCategoryRequest;
  onSubmit: (data: CreateCategoryRequest) => void;
  editingCategory: Category | null;
}

export default function CategoryForm({
  onSubmit,
  editingCategory,
}: CategoryFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useCategoryForm({
    editingCategory,
  });
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="name">Category Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            placeholder="Enter Category Name"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </FieldContent>
      </Field>

      <Button type="submit">Save</Button>
    </form>
  );
}
