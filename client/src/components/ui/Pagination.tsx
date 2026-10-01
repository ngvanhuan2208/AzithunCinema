'use client';
import { Button } from './Button';
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav aria-label="Phân trang" className="row">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Trang trước
      </Button>
      <span aria-live="polite">
        Trang {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Trang sau
      </Button>
    </nav>
  );
}
