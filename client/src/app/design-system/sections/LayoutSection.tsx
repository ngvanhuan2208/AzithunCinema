import { ContentGrid } from '@/components/layout/ContentGrid';
import { Rail } from '@/components/layout/Rail';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Section } from './Section';
export function LayoutSection() {
  return (
    <Section
      id="layout"
      number="09"
      title="Bố cục nền tảng"
      description="AppShell, Container, Header và Footer đang bao quanh trang này. Điều hướng sản phẩm được bổ sung ở F1."
    >
      <div className="stack gap-6">
        <div className="panel stack">
          <h3>ContentGrid</h3>
          <p className="muted-copy">2 / 3 / 4 / 5 / 6 cột theo breakpoint.</p>
          <ContentGrid>
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="layout-cell">
                Ô {index + 1}
              </div>
            ))}
          </ContentGrid>
        </div>
        <div className="panel stack">
          <h3>Rail</h3>
          <p className="muted-copy">
            Cuộn ngang, scroll-snap; nút điều hướng hiện khi hover hoặc focus
            trên desktop.
          </p>
          <Rail label="Mẫu bố cục cuộn ngang">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="layout-cell">
                Ô {index + 1}
              </div>
            ))}
          </Rail>
        </div>
        <div className="panel stack">
          <h3>MobileBottomNav shell</h3>
          <p className="muted-copy">
            Khung 5 vị trí, cao 64px cộng safe-area; chưa gắn mục điều hướng
            nghiệp vụ.
          </p>
          <MobileBottomNav preview>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} aria-hidden="true">
                {index + 1}
              </span>
            ))}
          </MobileBottomNav>
        </div>
      </div>
    </Section>
  );
}
