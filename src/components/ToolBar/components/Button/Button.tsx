import ButtonText from '../ButtonText/ButtonText';
import './Button.css';

interface Props {
  icon?: React.FC;
  text?: string;
  handler?: any;
}

export default function Button({ icon, text, handler }: Props) {
  const Icon = icon as React.FC;

  return (
    <button className="button" data-testid="button" onClick={handler}>
      {icon && <Icon />}
      {text && <ButtonText text={text} />}
    </button>
  );
}
