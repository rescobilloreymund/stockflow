import { SupplierService } from "@/services/supplier.service";

const supplierService = new SupplierService();

export async function GET() {
  const suppliers = await supplierService.getSuppliers();

  return Response.json(suppliers);
}
