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
export default function ProductsTableSkeleton() {
  return (
    <Table className="w-full table-fixed">
      <ProductsTableColGroup />
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-full h-4" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="w-full h-4" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="w-full h-4" />
          </TableHead>
          <TableHead className="text-center">
            <Skeleton className="w-full h-4" />
          </TableHead>
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
