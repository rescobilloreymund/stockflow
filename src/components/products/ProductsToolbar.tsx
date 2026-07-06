import { Category } from "@/types/category";
import { Input } from "../ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Button } from "../ui/Button";

interface ProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  selectedCategory: number;
  onCategoryChange: (value: number) => void;

  categories: Category[];

  onAddProduct: () => void;
}

export default function ProductsToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onAddProduct,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products..."
          className="min-w-80"
        />
        <Select
          value={selectedCategory.toString()}
          onValueChange={(value) => onCategoryChange(Number(value))}
        >
          <SelectTrigger className="min-w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem value={category.id.toString()} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onAddProduct}>Add product</Button>
    </div>
  );
}
