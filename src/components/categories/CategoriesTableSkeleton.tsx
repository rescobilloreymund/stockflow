import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import CategoriesTableColGroup from "./CategoriesTableColGroup";
export default function CategoriesTableSkeleton() {
  return (
    <Table className="w-full table-fixed">
      <CategoriesTableColGroup />
      <TableHeader>
        <TableRow>
          <TableHead>
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1">
              Category
            </p>
          </TableHead>
          <TableHead>
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1">
              Date Created
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
