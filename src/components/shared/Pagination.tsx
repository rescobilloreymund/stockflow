import { PageSize } from "@/types/common";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { PAGE_SIZES } from "@/constants/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: PageSize) => void;
}
const pageSizes: PageSize[] = PAGE_SIZES;
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalItems,
}: PaginationProps) {
  const formatShowingResults = () => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);

    return `Showing ${start} to ${end} of ${totalItems} results`;
  };
  const showingResults = formatShowingResults();
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

      <p className="text-sm text-muted-foreground">{showingResults}</p>

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
