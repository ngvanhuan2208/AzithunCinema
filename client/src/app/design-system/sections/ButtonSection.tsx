'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { Avatar } from '@/components/ui/Avatar';
import { Section } from './Section';
const variants: NonNullable<ButtonProps['variant']>[] = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
  'icon',
];
export function ButtonSection() {
  const [selected, setSelected] = useState(false);
  return (
    <Section
      id="buttons"
      number="04"
      title="Nút và nhãn"
      description="Hover, nhấn giữ và Tab để kiểm tra trạng thái thật. Nút loading giữ nguyên chiều rộng; vùng chạm mobile tối thiểu 44px."
    >
      <div className="stack gap-6">
        {variants.map((variant) => (
          <div key={variant} className="component-line">
            <code>{variant}</code>
            <div className="row">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <Button
                  key={size}
                  variant={variant}
                  size={size}
                  aria-label={
                    variant === 'icon' ? `Thêm mục, cỡ ${size}` : undefined
                  }
                >
                  {variant === 'icon' ? (
                    <Plus />
                  ) : (
                    <>
                      {variant === 'danger' && <Trash2 />}{' '}
                      {size === 'sm'
                        ? 'Cỡ nhỏ'
                        : size === 'md'
                          ? 'Cỡ vừa'
                          : 'Cỡ lớn'}
                    </>
                  )}
                </Button>
              ))}
              <Button
                variant={variant}
                disabled
                aria-label={
                  variant === 'icon' ? 'Thêm mục bị vô hiệu' : undefined
                }
              >
                {variant === 'icon' ? <Plus /> : 'Vô hiệu'}
              </Button>
              <Button
                variant={variant}
                loading
                aria-label={variant === 'icon' ? 'Đang thêm mục' : undefined}
              >
                {variant === 'icon' ? <Plus /> : 'Đang xử lý'}
              </Button>
            </div>
          </div>
        ))}
        <div className="panel stack">
          <h3>Nhãn và chip</h3>
          <div className="row">
            <Badge>Trung tính</Badge>
            <Badge tone="info">Thông tin</Badge>
            <Badge tone="success">Thành công</Badge>
            <Badge tone="warning">Cảnh báo</Badge>
            <Badge tone="danger">Có lỗi</Badge>
          </div>
          <div className="row">
            <Chip selected={selected} onClick={() => setSelected(!selected)}>
              Có thể chọn
            </Chip>
            <Chip selected>Đã chọn</Chip>
            <Chip disabled>Vô hiệu</Chip>
          </div>
        </div>
        <div className="panel stack">
          <h3>Avatar</h3>
          <div className="row">
            {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
              <Avatar
                key={size}
                label={`Ảnh đại diện trống, cỡ ${size}`}
                size={size}
              />
            ))}
            <Avatar label="Chữ cái thương hiệu" initials="A" />
            <Avatar src="/missing-avatar.png" label="Ảnh không tải được" />
          </div>
        </div>
      </div>
    </Section>
  );
}
