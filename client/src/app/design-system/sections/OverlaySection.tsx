'use client';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { Popover } from '@/components/ui/Popover';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Dialog } from '@/components/ui/Dialog';
import { Sheet } from '@/components/ui/Sheet';
import { toast } from '@/components/ui/Toast';
import { Section } from './Section';
export function OverlaySection() {
  return (
    <Section
      id="overlays"
      number="06"
      title="Lớp nổi"
      description="Popover ở lớp 60, sheet 70, dialog 80. Escape đóng lớp nổi và trả focus về nút mở."
    >
      <div className="panel row">
        <Tooltip content="Thông tin bổ sung">
          <Button variant="outline">
            <Info />
            Tooltip
          </Button>
        </Tooltip>
        <Popover trigger={<Button variant="outline">Mở popover</Button>}>
          <h3 className="text-h4">Thông tin bổ sung</h3>
          <p className="muted-copy">
            Nội dung ngắn, luôn giữ trong khung nhìn.
          </p>
          <Button
            variant="secondary"
            onClick={() => toast.info('Đã kiểm tra tương tác')}
          >
            Kiểm tra tương tác
          </Button>
        </Popover>
        <DropdownMenu
          trigger={<Button variant="outline">Mở menu</Button>}
          items={[
            {
              label: 'Kiểm tra tương tác',
              onSelect: () => toast.info('Đã kiểm tra tương tác'),
            },
            { label: 'Chưa khả dụng', disabled: true },
          ]}
        />
        <Dialog
          trigger={<Button variant="secondary">Mở hộp thoại</Button>}
          title="Hộp thoại mẫu"
          description="Focus được giữ trong hộp thoại khi mở. Nhấn Escape hoặc nút đóng để quay lại."
        >
          <p className="muted-copy">
            Bề mặt card, độ nổi cấp 3 và lớp phủ scrim.
          </p>
        </Dialog>
        <Sheet
          trigger={<Button variant="secondary">Mở ngăn bên</Button>}
          title="Ngăn bên mẫu"
          description="Nền tảng drawer cho màn hình nhỏ."
        >
          <p className="muted-copy">
            Nội dung thích ứng chiều cao và safe-area.
          </p>
        </Sheet>
      </div>
    </Section>
  );
}
