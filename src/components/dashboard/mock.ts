import { FolderTree, Package, Truck, Wallet } from "lucide-react";
import { InventoryStatusSummary, LowStockProduct } from "./types";
import { ChartConfig } from "../ui/chart";

export const dashboardStats = [
  {
    title: "Products",
    value: "254",
    description: "Total products",
    icon: Package,
  },
  {
    title: "Categories",
    value: "18",
    description: "Available categories",
    icon: FolderTree,
  },
  {
    title: "Suppliers",
    value: "12",
    description: "Active suppliers",
    icon: Truck,
  },
  {
    title: "Inventory Value",
    value: "₱152,340",
    description: "Current inventory value",
    icon: Wallet,
  },
];

export const inventoryStatus: InventoryStatusSummary[] = [
  {
    status: "In Stock",
    total: 220,
    fill: "var(--chart-1)",
  },
  {
    status: "Low Stock",
    total: 12,
    fill: "var(--chart-2)",
  },
  {
    status: "Out of Stock",
    total: 3,
    fill: "var(--chart-3)",
  },
];

export const inventoryStatusChartConfig = {
  total: {
    label: "Products",
  },
  "In Stock": {
    label: "In Stock",
    color: "var(--chart-1)",
  },
  "Low Stock": {
    label: "Low Stock",
    color: "var(--chart-2)",
  },
  "Out of Stock": {
    label: "Out of Stock",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const lowStockProducts: LowStockProduct[] = [
  {
    id: 1,
    name: "Logitech MX Master 3S",
    quantity: 2,
    status: "LOW_STOCK",
  },
  {
    id: 2,
    name: "Dell KB216 Keyboard",
    quantity: 1,
    status: "LOW_STOCK",
  },
  {
    id: 3,
    name: "Samsung 24 Monitor",
    quantity: 0,
    status: "OUT_OF_STOCK",
  },
];
