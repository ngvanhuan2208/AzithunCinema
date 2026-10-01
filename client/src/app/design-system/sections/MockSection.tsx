'use client';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api-client';
import { ContentSchema, paginatedSchema } from '@/lib/contracts';
import { Button } from '@/components/ui/Button';
import { Section } from './Section';
const schema = paginatedSchema(ContentSchema);
export function MockSection() {
  const enabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';
  const query = useQuery({
    queryKey: ['foundation', 'empty-collection'],
    queryFn: ({ signal }) => apiGet('/contents', schema, signal),
    enabled: false,
    retry: false,
  });
  return (
    <Section
      id="mock"
      number="11"
      title="Kết nối mock"
      description="MSW chỉ chạy trong dev khi NEXT_PUBLIC_MSW_ENABLED=true. Mẫu này kiểm tra lớp HTTP và Zod, không seed dữ liệu."
    >
      <div className="panel stack">
        <p className="muted-copy">
          {enabled
            ? 'MSW đang bật.'
            : 'MSW đang tắt. Bật biến môi trường và khởi động lại client để kiểm tra.'}
        </p>
        <div>
          <Button
            variant="secondary"
            disabled={!enabled}
            loading={query.isFetching}
            onClick={() => void query.refetch()}
          >
            Kiểm tra dữ liệu rỗng
          </Button>
        </div>
        <div aria-live="polite">
          {query.isSuccess && (
            <pre className="code-block">
              {JSON.stringify(query.data, null, 2)}
            </pre>
          )}
          {query.isError && (
            <p className="field-error">
              Không tải được dữ liệu. Kiểm tra MSW và thử lại.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
