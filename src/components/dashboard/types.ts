export interface InventoryStatusSummary {
  status: "In Stock" | "Low Stock" | "Out of Stock";
  total: number;
  fill: string;
}

export interface LowStockProduct {
  id: number;
  name: string;
  quantity: number;
  status: "LOW_STOCK" | "OUT_OF_STOCK";
}
