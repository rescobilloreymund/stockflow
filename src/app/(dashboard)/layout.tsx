import { LayoutProps } from "@/types/layout";
import AppLayout from "@/components/layout/AppLayout";

export default function DashboardLayout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
