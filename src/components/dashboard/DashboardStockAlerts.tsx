import { Fragment } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";

import { lowStockProducts } from "./mock";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Separator } from "../ui/separator";

export default function DashboardStockAlerts() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Stock Alerts</CardTitle>
        <CardDescription>
          Products requiring immediate attention.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <div>
          <p className="text-3xl font-bold">{lowStockProducts.length}</p>

          <p className="text-sm text-muted-foreground">
            {lowStockProducts.length === 1
              ? "Product requires attention"
              : "Products require attention"}
          </p>
        </div>

        <Separator />

        {/* Products */}
        <div className="space-y-4">
          {lowStockProducts.map((product, index) => (
            <Fragment key={product.id}>
              <div className="flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{product.name}</p>

                  <p className="text-sm text-muted-foreground">
                    {product.quantity === 0
                      ? "Out of stock"
                      : `${product.quantity} remaining`}
                  </p>
                </div>
              </div>

              {index < lowStockProducts.length - 1 && <Separator />}
            </Fragment>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          Go to Inventory
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
