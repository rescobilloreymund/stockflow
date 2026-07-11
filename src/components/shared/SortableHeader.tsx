import { SortDirection } from "@/types/common";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "../ui/Button";
interface SortableHeaderProps {
  label: string;
  isActive: boolean;
  direction?: SortDirection;
  onClick: () => void;
}

export default function SortableHeader({
  isActive,
  direction,
  label,
  onClick,
}: SortableHeaderProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="
        h-auto
        p-0
        font-semibold
        hover:bg-transparent
        justify-start"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {!isActive ? (
        <ArrowUpDown className="size-4 text-muted-foreground" />
      ) : direction === "asc" ? (
        <ArrowUp className="size-4 text-muted-foreground" />
      ) : (
        <ArrowDown className="size-4 text-muted-foreground" />
      )}
    </Button>
  );
}
