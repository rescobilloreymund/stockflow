export const inventoryStatusVariant = {
  OUT_OF_STOCK: "danger",
  LOW_STOCK: "warning",
  IN_STOCK: "success",
} as const;

export const productStatusVariant = {
  ACTIVE: "default",
  INACTIVE: "secondary",
  DISCONTINUED: "destructive",
} as const;
