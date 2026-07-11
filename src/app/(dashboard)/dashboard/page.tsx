import DashboardInventoryStatus from "@/components/dashboard/DashboardInventoryStatus";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import DashboardStockAlerts from "@/components/dashboard/DashboardStockAlerts";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Monitor inventory levels and business performance."
      />

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <DashboardInventoryStatus />
        </div>
        <div className="lg:col-span-3">
          <DashboardStockAlerts />
        </div>
      </div>
    </PageContainer>
  );
}
