import type { ReactNode } from 'react';
export function Section({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="ds-section">
      <div className="section-heading">
        <span className="section-number" aria-hidden="true">
          {number}
        </span>
        <div className="stack gap-2">
          <h2>{title}</h2>
          <p className="muted-copy">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
