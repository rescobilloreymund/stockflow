import { prisma } from "@/lib/prisma";

export class SupplierService {
  async getSuppliers() {
    return prisma.supplier.findMany();
  }
}
