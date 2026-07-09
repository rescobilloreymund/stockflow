import { createCategorySchema } from "@/schemas/category.schema";
import { CategoryService } from "@/services/category.service";

const categoryService = new CategoryService();
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const categoryId = Number(id);

    if (Number.isNaN(categoryId)) {
      return Response.json(
        {
          message: "Invalid category id.",
        },
        { status: 400 },
      );
    }

    const data = await request.json();

    const result = createCategorySchema.safeParse(data);

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

    const category = await categoryService.updateCategory(
      categoryId,
      result.data,
    );

    return Response.json(category, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to update category.",
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

    const categoryId = Number(id);

    if (Number.isNaN(categoryId)) {
      return Response.json(
        {
          message: "Invalid category id.",
        },
        { status: 400 },
      );
    }

    await categoryService.deleteCategory(categoryId);

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Failed to delete category.",
      },
      {
        status: 500,
      },
    );
  }
}
