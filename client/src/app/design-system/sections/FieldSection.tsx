'use client';
import { useState } from 'react';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Select } from '@/components/ui/Select';
import { Combobox } from '@/components/ui/Combobox';
import { Checkbox } from '@/components/ui/Checkbox';
import { Radio, RadioGroup } from '@/components/ui/Radio';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';
import { OTPInput } from '@/components/ui/OTPInput';
import { Section } from './Section';
const options = [
  { value: 'compact', label: 'Gọn' },
  { value: 'comfortable', label: 'Thoáng' },
];
export function FieldSection() {
  const [choice, setChoice] = useState('');
  const [otp, setOtp] = useState('');
  return (
    <Section
      id="fields"
      number="05"
      title="Trường nhập và lựa chọn"
      description="Nhãn liên kết với control. Lỗi có biểu tượng và mô tả; đây là mẫu primitive, chưa có form nghiệp vụ."
    >
      <div className="ds-grid">
        <div className="panel stack">
          <FormField
            label="Ô nhập"
            hint="Nhập văn bản để kiểm tra dấu tiếng Việt."
          >
            {(props) => <Input {...props} placeholder="Nhập nội dung" />}
          </FormField>
          <FormField
            label="Trạng thái lỗi"
            error="Nội dung chưa hợp lệ. Kiểm tra lại giá trị."
          >
            {(props) => <Input {...props} />}
          </FormField>
          <FormField label="Ô nhập vô hiệu">
            {(props) => (
              <Input {...props} disabled placeholder="Chưa khả dụng" />
            )}
          </FormField>
          <FormField label="Mật khẩu">
            {(props) => <PasswordInput {...props} autoComplete="off" />}
          </FormField>
          <FormField label="Văn bản nhiều dòng">
            {(props) => <Textarea {...props} placeholder="Nhập nội dung" />}
          </FormField>
          <FormField label="Văn bản nhiều dòng vô hiệu">
            {(props) => <Textarea {...props} disabled />}
          </FormField>
        </div>
        <div className="panel stack">
          <FormField label="Select">
            {(props) => (
              <Select
                {...props}
                label="Chọn mật độ"
                options={[
                  ...options,
                  {
                    value: 'unavailable',
                    label: 'Chưa khả dụng',
                    disabled: true,
                  },
                ]}
              />
            )}
          </FormField>
          <Select label="Select vô hiệu" options={options} disabled />
          <Combobox
            label="Tìm mật độ"
            options={options}
            value={choice}
            onChange={setChoice}
          />
          <Combobox
            label="Combobox vô hiệu"
            options={options}
            onChange={() => {}}
            disabled
          />
          <div className="stack">
            <span className="field-label">Ô nhập mã 6 chữ số</span>
            <OTPInput value={otp} onChange={setOtp} />
            <p className="muted-copy">
              Hỗ trợ dán cả chuỗi và di chuyển bằng bàn phím. Luồng gửi lại mã
              thuộc F1.
            </p>
          </div>
          <OTPInput value="" onChange={() => {}} disabled />
        </div>
        <div className="panel stack">
          <h3>Checkbox và Radio</h3>
          <label className="row">
            <Checkbox />
            Chưa chọn
          </label>
          <label className="row">
            <Checkbox defaultChecked />
            Đã chọn
          </label>
          <label className="row">
            <Checkbox checked="indeterminate" />
            Chọn một phần
          </label>
          <label className="row">
            <Checkbox disabled />
            Vô hiệu
          </label>
          <RadioGroup aria-label="Mật độ trình bày" defaultValue="compact">
            <label className="row">
              <Radio value="compact" />
              Gọn
            </label>
            <label className="row">
              <Radio value="comfortable" />
              Thoáng
            </label>
            <label className="row">
              <Radio value="disabled" disabled />
              Vô hiệu
            </label>
          </RadioGroup>
        </div>
        <div className="panel stack">
          <h3>Switch và Slider</h3>
          <label className="row">
            <Switch />
            Tắt
          </label>
          <label className="row">
            <Switch defaultChecked />
            Bật
          </label>
          <label className="row">
            <Switch disabled />
            Vô hiệu
          </label>
          <Slider label="Giá trị mẫu" defaultValue={[35]} />
          <Slider label="Giá trị mẫu vô hiệu" defaultValue={[35]} disabled />
          <p className="muted-copy">
            Dùng phím mũi tên để thay đổi giá trị slider.
          </p>
        </div>
      </div>
    </Section>
  );
}
