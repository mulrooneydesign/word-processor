import {
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  FolderNotchOpen,
} from 'phosphor-react';

import Button from './Button/Button';
import { useMarkdownStore } from '../../store/store';
import { exportFile } from '../../helpers/exportFile';
import { Modal } from '../Modal/Modal';

import './ToolBar.css';
import Tootip from '../Tooltip/Tooltip';

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
        <Modal
          title="Download your file"
          subtitle="Please enter a file name"
          handler={saveFileHandler}
        />
      )}
      <div className="toolBar" data-testid="toolBar">
        <h1 className="title">Markdown</h1>
        <div className="buttonGroup">
          <Tootip text="Save your file to disk">
            <Button
              icon={FloppyDisk}
              text="Save"
              handler={() => showModalHandler()}
            />
          </Tootip>
          <Button icon={FolderNotchOpen} text="Load" disabled={true} />
          <Button icon={ArrowUUpLeft} text="Undo" disabled={true} />
          <Button icon={ArrowUUpRight} text="Redo" disabled={true} />
        </div>
      </div>
    </>
  );
}
