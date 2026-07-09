import { CategoryService } from "@/services/category.service";

const categoryService = new CategoryService();

export async function GET(request: Request) {
  try {
    const response = await categoryService.getCategoryOptions();

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
