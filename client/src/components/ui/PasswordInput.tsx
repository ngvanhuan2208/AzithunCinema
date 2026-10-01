'use client';
import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
export function PasswordInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-wrap">
      <Input {...props} type={visible ? 'text' : 'password'} />
      <Button
        variant="icon"
        className="password-toggle"
        disabled={props.disabled}
        aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
        aria-pressed={visible}
        onClick={() => setVisible(!visible)}
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
