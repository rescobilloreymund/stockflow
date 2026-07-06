import { CategoryService } from "@/services/category.service";

const categoryService = new CategoryService();

export async function GET() {
  const categories = await categoryService.getCategories();

  return Response.json(categories);
}
