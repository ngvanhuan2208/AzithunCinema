import type { CSSProperties } from 'react';
import { Film, Volume2, CircleCheck } from 'lucide-react';
import { Section } from './Section';
import { Table } from '@/components/ui/Table';
export function FoundationSection() {
  return (
    <Section
      id="foundation"
      number="03"
      title="Nền tảng thị giác"
      description="Mọi giá trị dùng chung được tập trung trong globals.css và ánh xạ sang Tailwind."
    >
      <div className="stack gap-8">
        <div className="panel stack">
          <h3>Khoảng cách</h3>
          {[1, 2, 3, 4, 6, 8, 12, 16, 24].map((step) => (
            <div key={step} className="row">
              <code className="space-label">{step * 4}px</code>
              <div
                className="space-sample"
                style={{ width: `var(--space-${step})` }}
              />
            </div>
          ))}
        </div>
        <div className="ds-grid">
          {['sm', 'md', 'lg', 'pill'].map((radius) => (
            <div
              key={radius}
              className="radius-sample"
              style={{ borderRadius: `var(--radius-${radius})` }}
            >
              radius-{radius}
            </div>
          ))}
        </div>
        <div className="ds-grid">
          {['0', '1', '2', '3', 'hero'].map((level) => (
            <div
              key={level}
              className="elevation-sample"
              style={{ boxShadow: `var(--shadow-${level})` }}
            >
              {level === 'hero' ? 'Glow · chỉ nút Hero' : `Elevation ${level}`}
            </div>
          ))}
        </div>
        <div className="ds-grid">
          {['hero-fade-bottom', 'hero-fade-left', 'card-fade'].map(
            (gradient) => (
              <div
                key={gradient}
                className="gradient-sample"
                style={{ backgroundImage: `var(--${gradient})` }}
              >
                <code>{gradient}</code>
              </div>
            ),
          )}
        </div>
        <div className="ds-grid">
          <div className="panel stack">
            <h3>Chuyển động</h3>
            <p className="muted-copy">
              Di chuột hoặc focus vào mẫu. Chuyển động tắt khi hệ điều hành bật
              reduced motion.
            </p>
            {['fast', 'base', 'slow'].map((duration) => (
              <button
                key={duration}
                className="motion-sample"
                style={
                  {
                    '--sample-duration': `var(--dur-${duration})`,
                  } as CSSProperties
                }
              >
                dur-{duration}
                <span />
              </button>
            ))}
          </div>
          <div className="panel stack">
            <h3>Biểu tượng</h3>
            <div className="row">
              <Film className="icon-sm" />
              <Volume2 />
              <CircleCheck className="icon-lg" />
              <Film className="icon-player" />
            </div>
            <p className="muted-copy">
              Nét 1.75 · 16 / 20 / 24px · Player 28px (quy tắc kích thước).
            </p>
            <button className="focus-sample">
              Nhấn Tab để kiểm tra vòng focus
            </button>
          </div>
        </div>
        <Table>
          <caption className="sr-only">Breakpoint và lớp hiển thị</caption>
          <thead>
            <tr>
              <th>Breakpoint</th>
              <th>Giá trị</th>
              <th>Lớp hiển thị</th>
              <th>z-index</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['sm', '640', 'Nội dung', '0'],
              ['md', '768', 'Header', '40'],
              ['lg', '1024', 'MiniPlayer (dự phòng)', '50'],
              ['xl', '1280', 'Popover', '60'],
              ['2xl', '1536', 'Sheet', '70'],
              ['—', '—', 'Modal', '80'],
              ['—', '—', 'Toast', '90'],
            ].map((row) => (
              <tr key={row[2]}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Section>
  );
}
