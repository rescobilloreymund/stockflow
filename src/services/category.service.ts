import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  CreateCategoryRequest,
  GetCategoriesRequest,
  GetCategoriesResponse,
  UpdateCategoryRequest,
} from "@/types/category";
import { toCategories } from "@/utils/mappers/categories/category.mapper";
import { Option } from "@/types/option";

export class CategoryService {
  async getCategories(
    filters: GetCategoriesRequest,
  ): Promise<GetCategoriesResponse> {
    const { search, page, pageSize, sortBy, sortDirection } = filters;

    const where: Prisma.CategoryWhereInput = {};
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const [totalItems, categoryEntities] = await Promise.all([
      prisma.category.count({
        where,
      }),
      prisma.category.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortDirection,
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const data = toCategories(categoryEntities);

    return {
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  }

  async createCategory(data: CreateCategoryRequest) {
    return prisma.category.create({
      data: {
        name: data.name.trim(),
      },
    });
  }

  async updateCategory(id: number, data: UpdateCategoryRequest) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name.trim(),
      },
    });
  }

  async deleteCategory(id: number) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }

  // async getCategoryOptions(): Promise<Option<number>[]> {
  //   const categories = await prisma.category.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //     },
  //     orderBy: {
  //       name: "asc",
  //     },
  //   });

  //   return categories;
  // }
}
