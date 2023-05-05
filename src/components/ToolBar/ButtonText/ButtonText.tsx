interface Props {
  text: string;
}

export default function ButtonText({ text }: Props) {
  return <span className="buttonText">{text}</span>;
}
