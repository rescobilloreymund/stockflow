import { createSupplierSchema } from "@/schemas/supplier.schema";
import { SupplierService } from "@/services/supplier.service";

const supplierService = new SupplierService();
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const supplierId = Number(id);

    if (Number.isNaN(supplierId)) {
      return Response.json(
        {
          message: "Invalid supplier id.",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    const result = createSupplierSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field == "string") {
          errors[field] = issue.message;
        }
      }

      return Response.json(
        {
          message: "Validation failed.",
          errors,
        },
        {
          status: 400,
        },
      );
    }

    const supplier = await supplierService.updateSupplier(
      supplierId,
      result.data,
    );

    return Response.json(supplier, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update supplier.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const supplierId = Number(id);

    if (Number.isNaN(supplierId)) {
      return Response.json(
        {
          message: "Invalid supplier id.",
        },
        { status: 400 },
      );
    }

    await supplierService.deleteSupplier(supplierId);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to delete supplier.",
      },
      {
        status: 500,
      },
    );
  }
}
