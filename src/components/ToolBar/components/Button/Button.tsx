import ButtonText from '../ButtonText/ButtonText';
import './Button.css';

interface Props {
  icon?: React.FC;
  text?: string;
}

export default function Button({ icon, text }: Props) {
  const Icon = icon as React.FC;

  return (
    <button className="button" data-testid="button">
      {icon && <Icon />}
      {text && <ButtonText text={text} />}
    </button>
  );
}
