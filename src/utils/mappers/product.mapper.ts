import { Product } from "@/types/product";
import { Product as PrismaProduct } from "@/generated/prisma/client";

export function toProduct(product: PrismaProduct): Product {
  return {
    ...product,
    cost: product.cost.toNumber(),
    price: product.price.toNumber(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function toProducts(products: PrismaProduct[]): Product[] {
  return products.map(toProduct);
}
