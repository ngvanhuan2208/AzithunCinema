'use client';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Banner } from '@/components/ui/Banner';
import { Progress } from '@/components/ui/Progress';
import { Spinner } from '@/components/ui/Spinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { Table } from '@/components/ui/Table';
import { Separator } from '@/components/ui/Separator';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { toast } from '@/components/ui/Toast';
import { Section } from './Section';
export function FeedbackSection() {
  return (
    <Section
      id="feedback"
      number="08"
      title="Phản hồi và dữ liệu"
      description="Màu ngữ nghĩa luôn có icon và chữ. Thông báo động được đọc bởi công nghệ hỗ trợ."
    >
      <div className="ds-grid">
        <div className="stack">
          <Alert tone="success" title="Thao tác hoàn tất">
            Đây là trạng thái thành công của primitive.
          </Alert>
          <Alert tone="danger" title="Không thực hiện được thao tác">
            Kiểm tra kết nối rồi thử lại.
          </Alert>
          <Alert tone="warning" title="Cần kiểm tra lại">
            Xem lại thông tin trước khi tiếp tục.
          </Alert>
          <Alert tone="info" title="Thông tin bổ sung">
            Mẫu thông báo dùng chung.
          </Alert>
          <Banner tone="info" title="Banner nền tảng" />
        </div>
        <div className="panel stack">
          <h3>Toast</h3>
          <div className="row">
            <Button
              variant="outline"
              onClick={() => toast.success('Thao tác hoàn tất')}
            >
              Thành công
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error('Không thực hiện được thao tác', {
                  description: 'Kiểm tra kết nối rồi thử lại.',
                })
              }
            >
              Lỗi
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning('Cần kiểm tra lại')}
            >
              Cảnh báo
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info('Thông tin bổ sung')}
            >
              Thông tin
            </Button>
          </div>
          <Separator />
          <h3>Tiến độ và tải</h3>
          <Progress label="Tiến độ mẫu" value={45} />
          <Progress label="Chưa bắt đầu" value={0} />
          <Progress label="Hoàn tất" value={100} />
          <Progress label="Chưa xác định tiến độ" />
          <div className="row">
            <Spinner />
            <span className="muted-copy">Đang tải</span>
          </div>
          <Skeleton />
          <Skeleton className="w-3/4" />
        </div>
      </div>
      <div className="panel stack">
        <Table>
          <caption className="sr-only">
            Bảng quy tắc trạng thái của primitive
          </caption>
          <thead>
            <tr>
              <th>Trạng thái</th>
              <th>Biểu hiện</th>
              <th>Tương tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mặc định</td>
              <td>Viền border</td>
              <td>Sẵn sàng</td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>Vòng cyan</td>
              <td>Bàn phím</td>
            </tr>
            <tr>
              <td>Vô hiệu</td>
              <td>Giảm độ nổi bật</td>
              <td>Không nhận thao tác</td>
            </tr>
          </tbody>
        </Table>
        <ScrollArea className="demo-scroll" label="Danh sách token có thể cuộn">
          <div className="stack p-4">
            {[
              'background',
              'foreground',
              'primary',
              'secondary',
              'muted',
              'accent',
              'border',
              'input',
              'ring',
              'warning',
              'success',
              'info',
            ].map((token) => (
              <code key={token}>{token}</code>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Section>
  );
}
