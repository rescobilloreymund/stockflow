import { Product } from "@/types/product";
import { Badge } from "../ui/Badge";
import { productStatusVariant } from "@/constants/badgeVariants";
import { TableRow, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatters/currency.formatter";
import { formatProductStatus } from "@/utils/formatters/product.formatter";
import ProductRowActions from "./ProductRowActions";
interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}: ProductRowProps) {
  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{product.name}</span>
          <span className="text-xs text-muted-foreground">{product.sku}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">
          <Badge variant={productStatusVariant[product.status]}>
            {formatProductStatus(product.status)}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(product.price)}
      </TableCell>
      <TableCell className="text-center">
        <ProductRowActions
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
