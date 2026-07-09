import { Category, CategorySortField } from "@/types/category";
import { Table, TableBody } from "@/components/ui/table";
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableColGroup from "./CategoriesTableColGroup";
import CategoryRow from "./CategoryRow";
import { SortDirection } from "@/types/common";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => Promise<void>;
  sortBy: CategorySortField;
  sortDirection: SortDirection;
  onSort: (field: CategorySortField) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  sortBy,
  sortDirection,
  onSort,
}: CategoriesTableProps) {
  return (
    <Table className="w-full table-fixed">
      <CategoriesTableColGroup />

      <CategoriesTableHeader
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      <TableBody>
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
