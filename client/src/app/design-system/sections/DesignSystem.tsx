import { Palette, Layers3, Menu } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Container } from '@/components/layout/Container';
import { PageHeader } from '@/components/layout/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Sheet } from '@/components/ui/Sheet';
import { ColorSection } from './ColorSection';
import { TypographySection } from './TypographySection';
import { FoundationSection } from './FoundationSection';
import { ButtonSection } from './ButtonSection';
import { FieldSection } from './FieldSection';
import { OverlaySection } from './OverlaySection';
import { NavigationSection } from './NavigationSection';
import { FeedbackSection } from './FeedbackSection';
import { LayoutSection } from './LayoutSection';
import { StateSection } from './StateSection';
import { MockSection } from './MockSection';
import { sections } from './tokens';
export function DesignSystem() {
  const navigation = (
    <nav aria-label="Mục lục hệ thống thiết kế" className="stack gap-1">
      {sections.map((section, index) => (
        <a key={section.id} className="ds-nav-link" href={`#${section.id}`}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          {section.label}
        </a>
      ))}
    </nav>
  );
  return (
    <AppShell
      header={
        <div className="row">
          <span className="ds-header-label">
            <Layers3 />
            Hệ thống thiết kế
          </span>
          <Badge>F0 · Dev</Badge>
          <div className="ds-mobile-menu">
            <Sheet
              title="Mục lục"
              description="Các nhóm foundation và primitive."
              trigger={
                <Button variant="icon" aria-label="Mở mục lục">
                  <Menu />
                </Button>
              }
            >
              {navigation}
            </Sheet>
          </div>
        </div>
      }
      footer={
        <p className="text-caption">
          Foundation · Chỉ giao diện tối · Tiếng Việt
        </p>
      }
    >
      <Container>
        <div className="ds-intro">
          <PageHeader
            title="Hệ thống thiết kế"
            description="Nền thị giác của Azithun. Một ngôn ngữ nhất quán cho mọi màn hình."
          />
          <div className="row muted-copy">
            <Palette />
            <span>Token có chủ đích</span>
            <span aria-hidden="true">·</span>
            <span>Tương tác có phản hồi</span>
            <span aria-hidden="true">·</span>
            <span>Tiếp cận từ nền tảng</span>
          </div>
        </div>
        <div className="ds-layout">
          <aside className="ds-sidebar">
            <p className="field-label mb-4">Trong trang này</p>
            {navigation}
            <div className="sidebar-note">
              <span className="status-dot" />
              <p>
                Foundation F0
                <br />
                <span className="text-text-muted">
                  Chưa có dữ liệu nghiệp vụ
                </span>
              </p>
            </div>
          </aside>
          <div className="ds-content">
            <ColorSection />
            <TypographySection />
            <FoundationSection />
            <ButtonSection />
            <FieldSection />
            <OverlaySection />
            <NavigationSection />
            <FeedbackSection />
            <LayoutSection />
            <StateSection />
            <MockSection />
          </div>
        </div>
      </Container>
    </AppShell>
  );
}
