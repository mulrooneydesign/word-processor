import React, { useState } from 'react';
import { db } from '../../../functions/server/api/db';
import ToolBar from '../ToolBar/ToolBar';
import Input from '../Input/Input';
import { X } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (pending) return;
    setPending(true);

    const { error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      navigate('/');
    }

    if (error) {
      setIsError(true);
      setErrorText(error.message);
      setPending(false);
    }
    return;
  };

  const emailChangeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event?.preventDefault();
    setEmail(event?.target.value);
  };

  const passwordChangeHandler = (event: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    event?.preventDefault();
    setPassword(event?.target.value);
  };

  const closeErrorHandler = () => {
    setIsError(false);
    setErrorText('');
  };

  return (
    <form onSubmit={loginHandler} className="loginForm" data-testid="login">
      <h1>Login</h1>
      <p>Enter your login details.</p>
      <Input
        type="text"
        value={email}
        placeholder="email"
        handler={emailChangeHandler}
        required={true}
      />
      <Input
        type="password"
        value={password}
        placeholder="password"
        handler={passwordChangeHandler}
        required={true}
      />
      <ErrorMessage
        isError={isError}
        errorText={errorText}
        handler={closeErrorHandler}
      />
      <Input type="submit" value="Login" pending={pending} />
      <Link to="/sign-up">Don't have an account? Sign up here!</Link>
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

export default function Signup() {
  return (
    <>
      <ToolBar />
      <main className="login">
        <LoginForm />
      </main>
    </>
  );
}
