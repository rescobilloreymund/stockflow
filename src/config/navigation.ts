import {
  LucideIcon,
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  Boxes,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavigationSection {
  id: string;
  title?: string;
  items: NavigationItem[];
}

export const navigationSections: NavigationSection[] = [
  {
    id: "dashboard",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    id: "catalog",
    title: "Catalog",
    items: [
      { label: "Products", href: "/products", icon: Package },
      { label: "Categories", href: "/categories", icon: FolderTree },
      { label: "Suppliers", href: "/suppliers", icon: Truck },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    items: [
      { label: "Inventory", href: "/inventory", icon: Boxes },
      { label: "Purchases", href: "/purchases", icon: ShoppingCart },
      { label: "Sales", href: "/sales", icon: DollarSign },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    items: [{ label: "Reports", href: "/reports", icon: BarChart3 }],
  },
  {
    id: "system",
    title: "System",
    items: [{ label: "Settings", href: "/settings", icon: Settings }],
  },
];
