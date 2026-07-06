import { Button } from "../ui/Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
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
  );
}
