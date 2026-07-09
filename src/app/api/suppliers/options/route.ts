import { SupplierService } from "@/services/supplier.service";

const supplierService = new SupplierService();

export async function GET(request: Request) {
  try {
    const response = await supplierService.getSupplierOptions();

    return Response.json(response);
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);

    return Response.json(
      {
        message: "Failed to fetch suppliers.",
      },
      {
        status: 500,
      },
    );
  }
}
