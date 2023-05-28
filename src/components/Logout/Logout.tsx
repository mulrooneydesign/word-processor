import { useEffect, useState, useCallback } from 'react';
import { db } from '../../api/db';
import ToolBar from '../ToolBar/ToolBar';
import { X } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useMarkdownStore } from '../../store/store';
import './Logout.css';

function LogoutForm() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [pending, setPending] = useState(false);

  const setIsLoggedIn = useMarkdownStore((state) => state.setIsLoggedIn);
  const setCurrentFile = useMarkdownStore((state) => state.setCurrentFile);
  const setMarkdown = useMarkdownStore((state) => state.setMarkdown);

  const logoutHandler = useCallback(async () => {
    if (pending) return;

    setPending(true);
    const { error } = await db.auth.signOut();

    if (!error) {
      setIsLoggedIn(false);
      setCurrentFile('');
      setMarkdown('');
    }

    if (error) {
      setIsError(true);
      setErrorText(error.message);
      setPending(false);
    }
    return;
  }, [pending, setIsLoggedIn, setCurrentFile, setMarkdown]);

  const closeErrorHandler = () => {
    setIsError(false);
    setErrorText('');
  };

  useEffect(() => {
    logoutHandler();
  }, [logoutHandler]);

  return (
    <form onSubmit={logoutHandler} className="logoutForm" data-testid="logout">
      <h1>Logged Out</h1>
      <p>Log out here, we're sorry to see you go!</p>
      <Link to="/login">Login</Link>
      <ErrorMessage
        isError={isError}
        errorText={errorText}
        handler={closeErrorHandler}
      />
    </form>
  );
}

const ErrorMessage = ({
  isError,
  errorText,
  handler,
}: {
  isError: boolean;
  errorText: string;
  handler?: () => void;
}) => {
  return isError ? (
    <p className="error" data-testid="error">
      {errorText}
      <span onClick={handler} className="closeError">
        <X />
      </span>
    </p>
  ) : null;
};

export default function Logout() {
  return (
    <>
      <ToolBar />
      <main className="logout">
        <LogoutForm />
      </main>
    </>
  );
}
