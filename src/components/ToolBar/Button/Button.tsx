import ButtonText from '../ButtonText/ButtonText';
import './Button.css';

interface Props {
  icon?: React.FC;
  text?: string;
  handler?: () => void;
  disabled?: boolean;
}

export default function Button({ icon, text, handler, disabled }: Props) {
  const Icon = icon as React.FC;

  return (
    <button
      className="button"
      data-testid="button"
      onClick={() => {
        !disabled && handler && handler();
      }}
      disabled={!!disabled}>
      {icon && <Icon />}
      {text && <ButtonText text={text} />}
    </button>
  );
}
