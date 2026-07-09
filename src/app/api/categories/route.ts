import { createCategorySchema } from "@/schemas/category.schema";
import { CategoryService } from "@/services/category.service";
import { CategorySortField, GetCategoriesRequest } from "@/types/category";
import { SortDirection } from "@/types/common";

const categoryService = new CategoryService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: GetCategoriesRequest = {
      page: Number(searchParams.get("page") ?? "1"),
      pageSize: Number(searchParams.get("pageSize") ?? "10"),
      sortBy: (searchParams.get("sortBy") as CategorySortField) ?? "createdAt",
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

    const response = await categoryService.getCategories(filters);

    return Response.json(response);
  } catch (error) {
    console.error("Failed to fetch categories:", error);

    return Response.json(
      {
        message: "Failed to fetch categories.",
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

    const result = createCategorySchema.safeParse(body);

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

    const category = await categoryService.createCategory(result.data);

    return Response.json(category, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to create category.",
      },
      {
        status: 500,
      },
    );
  }
}
