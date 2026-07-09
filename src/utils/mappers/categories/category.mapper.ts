import { Category as PrismaCategory } from "@/generated/prisma/client";
import { Category } from "@/types/category";

export function toCategory(category: PrismaCategory): Category {
  return {
    ...category,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}

export function toCategories(categories: PrismaCategory[]): Category[] {
  return categories.map(toCategory);
}
