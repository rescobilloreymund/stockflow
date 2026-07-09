import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { toProducts } from "@/utils/mappers/products/product.mapper";
import {
  CreateProductRequest,
  GetProductsRequest,
  GetProductsResponse,
  UpdateProductRequest,
  Product,
} from "@/types/product";
export class ProductService {
  async getProducts(filters: GetProductsRequest): Promise<GetProductsResponse> {
    const {
      search,
      categoryId,
      page,
      pageSize,
      sortBy,
      sortDirection,
      status,
    } = filters;
    console.log(typeof status, status);
    const where: Prisma.ProductWhereInput = {};
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (status) {
      where.status = status;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }
    const [totalItems, products] = await Promise.all([
      prisma.product.count({
        where,
      }),
      prisma.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortDirection,
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const data = toProducts(products);

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

  async createProduct(data: CreateProductRequest) {
    return prisma.product.create({
      data: {
        name: data.name.trim(),
        sku: data.sku.trim().toUpperCase(),
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        cost: data.cost,
        price: data.price,
        status: data.status,
      },
    });
  }

  async updateProduct(id: number, data: UpdateProductRequest) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name.trim(),
        sku: data.sku.trim().toUpperCase(),
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        cost: data.cost,
        price: data.price,
        status: data.status,
      },
    });
  }

  async deleteProduct(id: number) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
