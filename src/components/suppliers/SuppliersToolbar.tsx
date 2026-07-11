import SearchInput from "../shared/SearchInput";

interface SuppliersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SuppliersToolbar({
  search,
  onSearchChange,
}: SuppliersToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search suppliers..."
        />
      </div>
    </div>
  );
}
