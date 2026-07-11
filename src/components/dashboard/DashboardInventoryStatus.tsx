"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import { ChartContainer } from "@/components/ui/chart";

import { inventoryStatus, inventoryStatusChartConfig } from "./mock";

export default function DashboardInventoryStatus() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
        <CardDescription>
          Current stock distribution across all products.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="flex justify-center">
          <ChartContainer
            config={inventoryStatusChartConfig}
            className="h-[280px] w-[280px]"
            aria-label="Inventory status chart"
          >
            <PieChart>
              <Pie
                data={inventoryStatus}
                dataKey="total"
                nameKey="status"
                innerRadius={90}
                outerRadius={125}
              />
            </PieChart>
          </ChartContainer>
        </div>

        <div className="mx-auto w-full max-w-xs space-y-4">
          {inventoryStatus.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: item.fill,
                  }}
                />

                <span className="text-sm font-medium">{item.status}</span>
              </div>

              <span className="text-sm font-semibold">{item.total}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
