import { Category } from "@/types/category";
import { TableRow, TableCell } from "@/components/ui/table";
import CategoryRowActions from "./CategoryRowActions";
import { formatDate } from "@/utils/formatters/date.formatter";
interface CategoryRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{category.name}</span>
        </div>
      </TableCell>
      <TableCell>{formatDate(category.createdAt)}</TableCell>

      <TableCell className="text-center">
        <CategoryRowActions
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
