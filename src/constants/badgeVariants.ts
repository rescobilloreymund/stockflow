export const inventoryStatusVariant = {
  OUT_OF_STOCK: "danger",
  LOW_STOCK: "warning",
  IN_STOCK: "success",
} as const;

export const productStatusVariant = {
  ACTIVE: "success",
  INACTIVE: "warning",
  DISCONTINUED: "destructive",
} as const;
