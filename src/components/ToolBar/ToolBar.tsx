import {
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  FolderNotchOpen,
  List,
  X,
} from 'phosphor-react';

import Button from './Button/Button';
import { useMarkdownStore } from '../../store/store';
import { exportFile } from '../../helpers/exportFile';
import { Modal } from '../Modal/Modal';

import './ToolBar.css';
import Tootip from '../Tooltip/Tooltip';
import { useEffect } from 'react';

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
  const menuIsOpen = useMarkdownStore((state) => state.menuIsOpen);

  const saveFileHandler = () => {
    exportFile(markdown, fileName);
    toggleModalIsOpen();
  };

  function ShowMenuButton() {
    const toggleMenuIsOpen = useMarkdownStore(
      (state) => state.toggleMenuIsOpen
    );

    const menuIsOpen = useMarkdownStore((state) => state.menuIsOpen);

    const showMenuHandler = () => {
      toggleMenuIsOpen();
    };

    return (
      <div className="showMenuButton">
        <Tootip text="Show menu">
          <Button
            icon={menuIsOpen ? X : List}
            handler={() => showMenuHandler()}
          />
        </Tootip>
      </div>
    );
  }

  const checkWindowSize = () => {
    if (window.innerWidth < 768) {
      useMarkdownStore.setState({ menuIsOpen: false });
    } else {
      useMarkdownStore.setState({ menuIsOpen: true });
    }
  };

  useEffect(() => {
    checkWindowSize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

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
        <ShowMenuButton />
        {menuIsOpen && (
          <div className="buttonGroup">
            <div className="menuItems">
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
        )}
      </div>
    </>
  );
}
