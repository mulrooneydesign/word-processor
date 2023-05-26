import './Input.css';

interface Props {
  value: string;
  placeholder?: string;
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}

export default function Input({
  value,
  placeholder,
  handler,
  type,
  required,
}: Props) {
  return (
    <input
      className={`input input--${type}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handler}
      required={required}
    />
  );
}
