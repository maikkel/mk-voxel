import { TextInput, TextInputProps } from '@mantine/core';

type SafeTextInputProps = Omit<TextInputProps, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  allowSpace?: boolean;
};

export default function SafeTextInput({
  value,
  onChange,
  allowSpace = true,
  ...props
}: SafeTextInputProps) {
  return (
    <TextInput
      {...props}
      value={value}
      onChange={(e) => {
        const input = e.currentTarget.value;
        onChange(allowSpace ? input : input.replace(/\s/g, ''));
      }}
      onKeyDown={(e) => {
        if (!allowSpace && e.key === ' ') {
          e.preventDefault();
        }

        props.onKeyDown?.(e); // preserve custom handlers if any
      }}
      onPaste={(e) => {
        if (!allowSpace) {
          const pasted = e.clipboardData.getData('text');
          if (/\s/.test(pasted)) {
            e.preventDefault();
          }
        }

        props.onPaste?.(e); // preserve custom handlers if any
      }}
    />
  );
}
