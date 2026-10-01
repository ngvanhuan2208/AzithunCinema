import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Đường dẫn">
      <ol className="row muted-copy">
        {items.map((item, index) => (
          <li key={item.label} className="row">
            {index > 0 && <ChevronRight aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
