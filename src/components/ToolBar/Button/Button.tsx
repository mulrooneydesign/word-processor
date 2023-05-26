import { Link } from 'react-router-dom';
import ButtonText from '../ButtonText/ButtonText';
import './Button.css';

interface Props {
  icon?: React.FC;
  text?: string;
  handler?: () => void;
  disabled?: boolean;
  route?: string;
}

const ButtonChild = ({ disabled, handler, icon, text }: Props) => {
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
};

export default function Button({
  icon,
  text,
  handler,
  disabled,
  route,
}: Props) {
  if (route)
    return (
      <Link to={route}>
        <ButtonChild
          icon={icon}
          text={text}
          disabled={disabled}
          route={route}
        />
      </Link>
    );

  return (
    <ButtonChild
      icon={icon}
      text={text}
      handler={handler}
      disabled={disabled}
    />
  );
}
