import {
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  FolderNotchOpen,
  List,
  X,
  UserPlus,
} from 'phosphor-react';

import Button from './Button/Button';
import { useMarkdownStore } from '../../store/store';
import { exportFile } from '../../helpers/exportFile';
import { Modal } from '../Modal/Modal';

import './ToolBar.css';
import Tootip from '../Tooltip/Tooltip';
import { useEffect } from 'react';
import { useCurrentRoute } from '../../helpers/useCurrentRoute';

import { Link } from 'react-router-dom';

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

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth > 768) {
        useMarkdownStore.setState({ menuIsOpen: true });
      } else {
        useMarkdownStore.setState({ menuIsOpen: false });
      }
    };

    window.addEventListener('resize', checkWindowSize);
  }, []);

  const currentRoute = useCurrentRoute();

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
        <h1 className="title">
          <Link to="/">Markdown</Link>
        </h1>
        <ShowMenuButton />
        {menuIsOpen && (
          <div className="buttonGroup">
            <div className="menuItems">
              <Tootip text="Save your file to disk">
                <Button
                  icon={FloppyDisk}
                  text="Save"
                  handler={() => showModalHandler()}
                  disabled={currentRoute !== '/'}
                />
              </Tootip>
              <Button icon={FolderNotchOpen} text="Load" disabled />
              <Button icon={ArrowUUpLeft} text="Undo" disabled />
              <Button icon={ArrowUUpRight} text="Redo" disabled />
              <Tootip text="Register a new user">
                <Button
                  icon={UserPlus}
                  text="Sign up"
                  route="/sign-up"
                  disabled={currentRoute === '/sign-up'}
                />
              </Tootip>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
