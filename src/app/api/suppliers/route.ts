import { createSupplierSchema } from "@/schemas/supplier.schema";
import { SupplierService } from "@/services/supplier.service";
import { SortDirection } from "@/types/common";
import { GetSuppliersRequest, SupplierSortField } from "@/types/supplier";

const supplierService = new SupplierService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: GetSuppliersRequest = {
      page: Number(searchParams.get("page") ?? "1"),
      pageSize: Number(searchParams.get("pageSize") ?? "10"),
      sortBy: (searchParams.get("sortBy") as SupplierSortField) ?? "createdAt",
      sortDirection:
        (searchParams.get("sortDirection") as SortDirection) ?? "desc",
    };

    if (filters.page < 1) {
      return Response.json({ message: "Invalid page." }, { status: 400 });
    }

    if (filters.pageSize < 1) {
      return Response.json({ message: "Invalid page size." }, { status: 400 });
    }

    const search = searchParams.get("search");

    if (search) {
      filters.search = search;
    }

    const response = await supplierService.getSuppliers(filters);

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createSupplierSchema.safeParse(body);

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

    const supplier = await supplierService.createSupplier(result.data);

    return Response.json(supplier, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create supplier.",
      },
      {
        status: 500,
      },
    );
  }
}
