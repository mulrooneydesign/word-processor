import {
  Export,
  FloppyDisk,
  FolderNotchOpen,
  List,
  X,
  UserPlus,
  UserMinus,
} from 'phosphor-react';

import Button from '../Button/Button';
import { useMarkdownStore } from '../../store/store';
import { exportFile } from '../../helpers/exportFile';
import { Modal } from '../Modal/Modal';
import { Save } from '../Save/Save';

import Tootip from '../Tooltip/Tooltip';
import { useEffect } from 'react';
import { useCurrentRoute } from '../../helpers/useCurrentRoute';

import { Link } from 'react-router-dom';

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
  const menuIsOpen = useMarkdownStore((state) => state.menuIsOpen);
  const isLoggedIn = useMarkdownStore((state) => state.isLoggedIn);

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
    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  const currentRoute = useCurrentRoute();

  const saveFileNameMenuIsOpen = useMarkdownStore(
    (state) => state.saveFileNameMenuIsOpen
  );

  function showSaveModal() {
    useMarkdownStore.setState({ saveFileNameMenuIsOpen: true });
  }

  return (
    <>
      {saveFileNameMenuIsOpen && <Save />}
      {modalIsOpen && (
        <Modal
          title="Download your file as a .md file"
          subtitle="Please enter a file name"
          handler={saveFileHandler}
          buttonText="Export"
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
              {isLoggedIn && (
                <Tootip text="Export your file to disk">
                  <Button
                    icon={Export}
                    text="Export"
                    handler={() => showModalHandler()}
                    disabled={currentRoute !== '/'}
                  />
                </Tootip>
              )}
              {isLoggedIn && (
                <Tootip text="Save your file">
                  <Button
                    icon={FloppyDisk}
                    text="Save"
                    handler={() => showSaveModal()}
                    disabled={currentRoute !== '/'}
                  />
                </Tootip>
              )}
              {isLoggedIn && (
                <Tootip text="Load your saved documents">
                  <Button
                    icon={FolderNotchOpen}
                    text="Load"
                    route="/saved-documents"
                    disabled={
                      currentRoute === '/saved-documents' || !isLoggedIn
                    }
                  />
                </Tootip>
              )}
              {!isLoggedIn && (
                <Tootip text="Register a new user">
                  <Button
                    icon={UserPlus}
                    text="Sign up"
                    route="/sign-up"
                    disabled={currentRoute === '/sign-up'}
                  />
                </Tootip>
              )}
              {!isLoggedIn && (
                <Tootip text="Login to your account">
                  <Button
                    icon={UserPlus}
                    text="Login"
                    route="/login"
                    disabled={currentRoute === '/login'}
                  />
                </Tootip>
              )}
              {isLoggedIn && (
                <Tootip text="Log your user out">
                  <Button
                    icon={UserMinus}
                    text="Logout"
                    route="/logout"
                    disabled={currentRoute === '/logout'}
                  />
                </Tootip>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
