import { NumberInput, NumberInputProps } from '@mantine/core';

type SafeNumberInputProps = Omit<NumberInputProps, 'onChange'> & {
  onChange: (value: number) => void;
};

export default function SafeNumberInput({ onChange, ...props }: SafeNumberInputProps) {
  return (
    <NumberInput
      {...props}
      onChange={(value) => {
        if (typeof value === 'number') {
          onChange(value);
        }
      }}
    />
  );
}
