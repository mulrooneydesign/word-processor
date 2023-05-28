import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
  icon?: React.FC;
  text?: string;
  handler?: () => void;
  disabled?: boolean;
  route?: string;
}

interface ButtonTextProps {
  text: string;
}
function ButtonText({ text }: ButtonTextProps) {
  return <span className="buttonText">{text}</span>;
}

const ButtonChild = ({ disabled, handler, icon, text }: ButtonProps) => {
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
}: ButtonProps) {
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
