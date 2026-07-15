import { ProductStatus } from "@/types/product";

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  DISCONTINUED: "Discontinued",
};

export function formatProductStatus(status: ProductStatus) {
  return PRODUCT_STATUS_LABELS[status];
}
