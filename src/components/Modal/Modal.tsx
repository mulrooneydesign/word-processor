import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { X } from 'phosphor-react';

import Button from '../Button/Button';
import './Modal.css';
import { useMarkdownStore } from '../../store/store';

export function Modal({
  title,
  subtitle,
  handler,
  buttonText,
}: {
  title: string;
  subtitle?: string;
  handler: () => void;
  buttonText: string;
}) {
  const setFilename = useMarkdownStore((state) => state.setFileName);

  const fileName = useMarkdownStore((state) => state.fileName);

  const toggleModalIsOpen = useMarkdownStore(
    (state) => state.toggleModalIsOpen
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  const closeHandler = useCallback(() => {
    setFilename('');
    toggleModalIsOpen();
  }, [toggleModalIsOpen, setFilename]);

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

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (fileName.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [fileName]);

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
        <p>{subtitle}</p>
        <input
          data-testid="modalInput"
          type="text"
          onChange={onChangeHandler}
          ref={callbackRef}
          required
        />
        <Button text={buttonText} handler={handler} disabled={disabled} />
      </div>
    </div>
  );
}
