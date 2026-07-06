import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import ProductsTableColGroup from "./ProductsTableColGroup";
import { ArrowUpDown } from "lucide-react";
export default function ProductsTableSkeleton() {
  return (
    <Table className="w-full table-fixed">
      <ProductsTableColGroup />
      <TableHeader>
        <TableRow>
          <TableHead>
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1">
              Product
            </p>
          </TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1 justify-end">
              Price
            </p>
          </TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-4" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
