import { createProductSchema } from "@/schemas/product.schema";
import { ProductService } from "@/services/product.service";
import { GetProductsRequest, ProductSortField } from "@/types/product";
import { SortDirection } from "@/types/common";
const productService = new ProductService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: GetProductsRequest = {
      page: Number(searchParams.get("page") ?? "1"),
      pageSize: Number(searchParams.get("pageSize") ?? "10"),
      sortBy: (searchParams.get("sortBy") as ProductSortField) ?? "createdAt",
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

    const categoryId = searchParams.get("categoryId");

    if (categoryId) {
      const parsedCategoryId = Number(categoryId);

      if (Number.isNaN(parsedCategoryId)) {
        return Response.json(
          {
            message: "Invalid category id",
          },
          { status: 400 },
        );
      }

      filters.categoryId = parsedCategoryId;
    }

    const response = await productService.getProducts(filters);

    return Response.json(response);
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return Response.json(
      {
        message: "Failed to fetch products.",
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

    const result = createProductSchema.safeParse(body);

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

    const product = await productService.createProduct(result.data);

    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create product.",
      },
      {
        status: 500,
      },
    );
  }
}
