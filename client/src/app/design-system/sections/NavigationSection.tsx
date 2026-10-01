'use client';
import { useState } from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Pagination } from '@/components/ui/Pagination';
import { Section } from './Section';
export function NavigationSection() {
  const [page, setPage] = useState(1);
  return (
    <Section
      id="navigation"
      number="07"
      title="Điều hướng"
      description="Trạng thái đang mở có thanh nhấn brand. Tabs và accordion hỗ trợ bàn phím."
    >
      <div className="panel stack">
        <Breadcrumb
          items={[
            { label: 'Azithun', href: '/' },
            { label: 'Hệ thống thiết kế' },
          ]}
        />
        <Tabs
          label="Mẫu tab"
          items={[
            {
              value: 'foundation',
              label: 'Nền tảng',
              content: 'Nền tảng thị giác dùng chung.',
            },
            {
              value: 'components',
              label: 'Thành phần',
              content: 'Các primitive tương tác độc lập.',
            },
            {
              value: 'disabled',
              label: 'Chưa khả dụng',
              disabled: true,
              content: '',
            },
          ]}
        />
        <Accordion
          items={[
            {
              title: 'Quy tắc giao diện tối',
              content: 'MVP chỉ có giao diện tối, không có công tắc đổi theme.',
            },
            {
              title: 'Quy tắc chuyển động',
              content:
                'Ưu tiên phản hồi thao tác; tôn trọng tùy chọn giảm chuyển động.',
            },
          ]}
        />
        <Pagination page={page} totalPages={3} onChange={setPage} />
      </div>
    </Section>
  );
}
