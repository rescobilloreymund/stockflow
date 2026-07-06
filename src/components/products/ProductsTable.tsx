import { Product } from "@/types/product";
import { Table, TableBody } from "@/components/ui/table";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableColGroup from "./ProductsTableColGroup";
import ProductRow from "./ProductRow";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <Table className="w-full table-fixed">
      <ProductsTableColGroup />

      <ProductsTableHeader />

      <TableBody>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
