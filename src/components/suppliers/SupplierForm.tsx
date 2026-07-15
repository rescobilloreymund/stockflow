import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { useSupplierForm } from "@/hooks/useSupplierForm";
import { Supplier } from "@/types/supplier";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import PhoneInput from "../shared/PhoneInput";
import { Controller } from "react-hook-form";
import { SupplierFormData } from "@/schemas/supplier.schema";

interface SupplierFormProps {
  defaultValues?: SupplierFormData;
  onSubmit: (data: SupplierFormData) => void;
  editingSupplier: Supplier | null;
}

export default function SupplierForm({
  onSubmit,
  editingSupplier,
}: SupplierFormProps) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useSupplierForm({
    editingSupplier,
  });
  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="name">Supplier Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            placeholder="Enter Supplier Name"
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </FieldContent>
      </Field>

      <Separator className="my-4" />

      <Field>
        <FieldLabel htmlFor="contactName">Contact Name</FieldLabel>
        <FieldContent>
          <Input
            id="contactName"
            placeholder="Enter Contact Name"
            {...register("contactName")}
          />
          <FieldError errors={[errors.contactName]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="contactName">Phone</FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                {...field}
                placeholder="Enter Phone Number"
                onBlur={field.onBlur}
                name="phone"
              />
            )}
          />
          <FieldError errors={[errors.phone]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldContent>
          <Input id="email" placeholder="Enter Email" {...register("email")} />
          <FieldError errors={[errors.email]} />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Address</FieldLabel>
        <FieldContent>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter Address"
                onBlur={field.onBlur}
                name="address"
              />
            )}
          />
          <FieldError errors={[errors.address]} />
        </FieldContent>
      </Field>

      <Button type="submit">Save</Button>
    </form>
  );
}
