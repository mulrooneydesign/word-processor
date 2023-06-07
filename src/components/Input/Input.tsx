import './Input.css';

interface Props {
  value?: string;
  placeholder?: string;
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  pending?: boolean;
}

export default function Input({
  value,
  placeholder,
  handler,
  type,
  required,
  pending,
}: Props) {
  return (
    <input
      className={`input input--${type} ${pending ? 'input--pending' : ''}`}
      type={type}
      value={!pending ? value : 'Pending...'}
      placeholder={placeholder}
      onChange={handler}
      required={required}
    />
  );
}
