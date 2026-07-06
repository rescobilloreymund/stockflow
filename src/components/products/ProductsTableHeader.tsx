import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function ProductsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Product</TableHead>
        <TableHead className="text-center">Status</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
