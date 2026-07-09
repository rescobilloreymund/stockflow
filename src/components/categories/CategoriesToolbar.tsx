import { Input } from "../ui/Input";

interface CategoriesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function CategoriesToolbar({
  search,
  onSearchChange,
}: CategoriesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search categories..."
          className="min-w-80"
        />
      </div>
    </div>
  );
}
