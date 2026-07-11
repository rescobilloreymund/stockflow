import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between p-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">{value}</h2>

          <p className="text-sm text-muted-foreground">{title}</p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
