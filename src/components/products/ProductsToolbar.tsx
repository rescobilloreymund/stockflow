import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { ProductStatusFilter } from "@/types/product";
import { ProductStatuses } from "@/constants/products";
import { formatProductStatus } from "@/utils/formatters/product.formatter";
import SearchInput from "../shared/SearchInput";
import { Option } from "@/types/option";
interface ProductsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  selectedCategory: number;
  onCategoryChange: (value: number) => void;

  categories: Option<number>[];

  status: ProductStatusFilter;
  onStatusChange: (value: ProductStatusFilter) => void;
}

export default function ProductsToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  status,
  onStatusChange,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search products..."
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
              <SelectItem
                value={category.value.toString()}
                key={category.value}
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status ?? "all"} onValueChange={onStatusChange}>
          <SelectTrigger className="min-w-48">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ProductStatuses.map((value) => (
              <SelectItem value={value} key={value}>
                {formatProductStatus(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
