import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import SuppliersTableColGroup from "./SuppliersTableColGroup";
export default function SuppliersTableSkeleton() {
  return (
    <Table className="w-full table-fixed">
      <SuppliersTableColGroup />
      <TableHeader>
        <TableRow>
          <TableHead>
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1">
              Name
            </p>
          </TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>
            <p className="text-[0.8rem] p-0 font-semibold flex items-center gap-1">
              Created
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
