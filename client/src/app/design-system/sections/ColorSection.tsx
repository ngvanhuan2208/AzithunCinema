import { ColorSwatch } from './ColorSwatch';
import { Section } from './Section';
import { colorGroups } from './tokens';
export function ColorSection() {
  return (
    <Section
      id="colors"
      number="01"
      title="Màu sắc"
      description="Bề mặt tối nhiều tầng. Đỏ dành cho hành động chính; màu ngữ nghĩa luôn đi kèm chữ hoặc biểu tượng."
    >
      <div className="stack gap-8">
        {colorGroups.map((group) => (
          <div key={group.title} className="stack">
            <h3 className="text-h4">{group.title}</h3>
            <div className="swatch-grid">
              {group.tokens.map((token) => (
                <ColorSwatch key={token} token={token} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
