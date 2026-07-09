import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useProductForm } from "@/hooks/useProductForm";
import { Product, CreateProductRequest } from "@/types/product";
import { CategoryOption } from "@/types/category";
import { SupplierOption } from "@/types/supplier";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Controller } from "react-hook-form";

interface ProductFormProps {
  defaultValues?: CreateProductRequest;
  onSubmit: (data: CreateProductRequest) => void;
  editingProduct: Product | null;
  categories: CategoryOption[];
  suppliers: SupplierOption[];
}

export default function ProductForm({
  onSubmit,
  editingProduct,
  categories,
  suppliers,
}: ProductFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useProductForm({
    editingProduct,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="name">Product Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            placeholder="Enter Product Name"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="sku">SKU</FieldLabel>
        <FieldContent>
          <Input id="sku" placeholder="Enter SKU" {...register("sku")} />
          <FieldError errors={[errors.sku]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="cost">Cost</FieldLabel>
        <FieldContent>
          <Input
            id="cost"
            type="number"
            {...register("cost", { valueAsNumber: true })}
          />
          <FieldError errors={[errors.cost]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="price">Price</FieldLabel>
        <FieldContent>
          <Input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          <FieldError errors={[errors.price]} />
        </FieldContent>
      </Field>

      <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange, ref } }) => {
          return (
            <Field>
              <FieldLabel>Status</FieldLabel>
              <FieldContent>
                <Select
                  value={value}
                  defaultValue={value}
                  onValueChange={onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.status]} />
              </FieldContent>
            </Field>
          );
        }}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <FieldContent>
              <Select
                value={value === 0 ? "" : value.toString()}
                onValueChange={(value) => onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.categoryId]} />
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="supplierId"
        render={({ field: { value, onChange } }) => (
          <Field>
            <FieldLabel>Suppliers</FieldLabel>
            <FieldContent>
              <Select
                value={value === 0 ? "" : value.toString()}
                onValueChange={(value) => onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem
                      value={supplier.id.toString()}
                      key={supplier.id}
                    >
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[errors.supplierId]} />
            </FieldContent>
          </Field>
        )}
      />

      <Button type="submit">Save</Button>
    </form>
  );
}
