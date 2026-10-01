import type { CSSProperties } from 'react';
import { Section } from './Section';
import { typeRoles } from './tokens';
export function TypographySection() {
  return (
    <Section
      id="typography"
      number="02"
      title="Kiểu chữ"
      description="Plus Jakarta Sans · 400 / 500 / 600 / 700 / 800 · Latin, Latin mở rộng và tiếng Việt."
    >
      <div className="type-specimen">
        <div className="display-specimen">
          Cảm xúc
          <br />
          <span className="text-text-secondary">qua từng nét chữ.</span>
        </div>
        <p className="muted-copy">
          Ă Â Đ Ê Ô Ơ Ư · ă â đ ê ô ơ ư · Sắc, huyền, hỏi, ngã, nặng.
        </p>
      </div>
      <div className="type-scale">
        {typeRoles.map((role) => (
          <div key={role} className="type-row">
            <code className="muted-copy">{role}</code>
            <p
              className="type-sample"
              data-role={role}
              style={
                {
                  '--sample-font': `var(--font-${role})`,
                  '--sample-leading': `var(--leading-${role})`,
                } as CSSProperties
              }
            >
              Thưởng thức những câu chuyện
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
