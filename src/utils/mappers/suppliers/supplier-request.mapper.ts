import { SupplierFormData } from "@/schemas/supplier.schema";
import { CreateSupplierRequest } from "@/types/supplier";

export function toRequest(form: SupplierFormData): CreateSupplierRequest {
  return {
    ...form,
    email: form.email || undefined,
  };
}
