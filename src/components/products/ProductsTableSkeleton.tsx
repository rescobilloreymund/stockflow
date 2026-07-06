import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import ProductsTableColGroup from "./ProductsTableColGroup";
import ProductsTableHeader from "./ProductsTableHeader";
export default function ProductsTableSkeleton() {
  return (
    <Table className="w-full table-fixed">
      <ProductsTableColGroup />
      <ProductsTableHeader />
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
