import {
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  FolderNotchOpen,
} from 'phosphor-react';

import Button from './components/Button/Button';
import { useMarkdownStore } from '../../store/store';
import { exportFile } from '../../helpers/exportFile';
import { Modal } from '../Modal/Modal';

import './ToolBar.css';

export default function ToolBar() {
  const toggleModalIsOpen = useMarkdownStore(
    (state) => state.toggleModalIsOpen
  );

  const showModalHandler = () => {
    toggleModalIsOpen();
  };

  const markdown = useMarkdownStore((state) => state.markdown);
  const fileName = useMarkdownStore((state) => state.fileName);
  const modalIsOpen = useMarkdownStore((state) => state.modalIsOpen);

  const saveFileHandler = () => {
    exportFile(markdown, fileName);
    toggleModalIsOpen();
  };

  return (
    <>
      {modalIsOpen && (
        <Modal title="Download your file" handler={saveFileHandler} />
      )}
      <div className="toolBar" data-testid="toolBar">
        <h1 className="title">Markdown</h1>
        <div className="buttonGroup">
          <Button
            icon={FloppyDisk}
            text="Save"
            handler={() => showModalHandler()}
          />
          <Button icon={FolderNotchOpen} text="Load" />
          <Button icon={ArrowUUpLeft} text="Undo" />
          <Button icon={ArrowUUpRight} text="Redo" />
        </div>
      </div>
    </>
  );
}
