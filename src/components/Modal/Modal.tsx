import { useCallback, useLayoutEffect } from 'react';
import { X } from 'phosphor-react';

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

  const toggleModalIsOpen = useMarkdownStore(
    (state) => state.toggleModalIsOpen
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  const closeHandler = useCallback(() => {
    toggleModalIsOpen();
  }, [toggleModalIsOpen]);

  const overlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event?.stopPropagation();
    if (event.target === event.currentTarget) {
      toggleModalIsOpen();
    }
  };

  const callbackRef = (inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  };

  useLayoutEffect(() => {
    const enterKeyPressHandler = (event: { key: string }) => {
      if (event.key === 'Enter') {
        handler();
      }
    };

    const escKeyPressHandler = (event: { key: string }) => {
      if (event.key === 'Escape') {
        closeHandler();
      }
    };

    document.addEventListener('keydown', enterKeyPressHandler);
    document.addEventListener('keydown', escKeyPressHandler);

    return () => {
      document.removeEventListener('keydown', enterKeyPressHandler);
      document.removeEventListener('keydown', escKeyPressHandler);
    };
  }, [handler, closeHandler]);

  return (
    <div className="modal" data-testid="modal" onClick={overlayClick}>
      <div className="modalContainer">
        <div
          data-testid="modalClose"
          className="modalClose"
          onClick={closeHandler}>
          <X />
        </div>
        <h2>{title}</h2>
        <input
          data-testid="modalInput"
          type="text"
          onChange={onChangeHandler}
          ref={callbackRef}
        />
        <Button text="Save" handler={handler} />
      </div>
    </div>
  );
}
