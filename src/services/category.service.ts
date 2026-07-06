import { prisma } from "@/lib/prisma";

export class CategoryService {
  async getCategories() {
    return prisma.category.findMany();
  }
}
