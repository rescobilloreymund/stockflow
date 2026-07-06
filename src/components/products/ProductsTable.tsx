import { Product, ProductSortField } from "@/types/product";
import { Table, TableBody } from "@/components/ui/table";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableColGroup from "./ProductsTableColGroup";
import ProductRow from "./ProductRow";
import { SortDirection } from "@/types/common";

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => Promise<void>;
  sortBy: ProductSortField;
  sortDirection: SortDirection;
  onSort: (field: ProductSortField) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  sortBy,
  sortDirection,
  onSort,
}: ProductsTableProps) {
  return (
    <Table className="w-full table-fixed">
      <ProductsTableColGroup />

      <ProductsTableHeader
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />

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
