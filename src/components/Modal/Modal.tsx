import Button from '../ToolBar/components/Button/Button';
import './Modal.css';
import { useMarkdownStore } from '../../store/store';

export function Modal({
  title,
  handler,
}: {
  title: string;
  handler: () => void;
}) {
  const setFilename = useMarkdownStore((state) => state.setFileName);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  return (
    <div className="modal" data-testid="modal">
      <div className="modalContainer">
        <h2>{title}</h2>
        <input type="text" onChange={onChangeHandler} />
        <Button text="Save" handler={handler} />
      </div>
    </div>
  );
}
