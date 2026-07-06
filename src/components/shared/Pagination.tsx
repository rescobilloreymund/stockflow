import { PageSize } from "@/types/common";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: PageSize) => void;
}
const pageSizes: number[] = [10, 20, 50];
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p>Show</p>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value) as PageSize)}
        >
          <SelectTrigger className="min-w-10">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="min-w-10">
            {pageSizes.map((size) => (
              <SelectItem value={size.toString()} key={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p>per page</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          &larr; Previous
        </Button>
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  );
}
