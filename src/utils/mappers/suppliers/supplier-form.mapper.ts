import { Supplier } from "@/types/supplier";

export function supplierToFormData(supplier: Supplier) {
  return {
    name: supplier.name,
    contactName: supplier.contactName,
    phone: supplier.phone,
    email: supplier.email || undefined,
    address: supplier.address,
  };
}
