import DashboardStatCard from "./DashboardStatCard";
import { dashboardStats } from "./mock";

export default function DashboardStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <DashboardStatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}
