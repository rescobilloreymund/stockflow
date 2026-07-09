import { Product } from "@/types/product";

export function productToFormData(product: Product) {
  return {
    name: product.name,
    sku: product.sku,
    categoryId: product.categoryId,
    supplierId: product.supplierId,
    cost: product.cost,
    price: product.price,
    status: product.status,
  };
}
