import { Supplier } from "@/types/supplier";
import { Supplier as PrismaSupplier } from "@/generated/prisma/client";

export function toSupplier(supplier: PrismaSupplier): Supplier {
  return {
    ...supplier,
    email: supplier.email ? supplier.email.toString() : undefined,
    createdAt: supplier.createdAt.toISOString(),
    updatedAt: supplier.updatedAt.toISOString(),
  };
}

export function toSuppliers(suppliers: PrismaSupplier[]): Supplier[] {
  return suppliers.map(toSupplier);
}
