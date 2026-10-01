'use client';
import { OTPInput as Primitive, REGEXP_ONLY_DIGITS } from 'input-otp';
export function OTPInput({
  value,
  onChange,
  disabled,
  invalid,
  id,
  describedBy,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  describedBy?: string;
}) {
  return (
    <Primitive
      id={id}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-label="Mã xác nhận gồm 6 chữ số"
      aria-invalid={invalid}
      aria-describedby={describedBy}
      containerClassName="otp-group"
      render={({ slots }) => (
        <>
          {slots.map((slot, index) => (
            <span
              aria-hidden="true"
              key={index}
              className="otp-slot"
              data-active={slot.isActive}
              data-invalid={invalid}
            >
              {slot.char || (slot.hasFakeCaret ? '|' : '')}
            </span>
          ))}
        </>
      )}
    />
  );
}
