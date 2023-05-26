import React, { useState } from 'react';
import { db } from '../../api/db';
import ToolBar from '../ToolBar/ToolBar';
import Input from './Input/Input';
import { X } from 'phosphor-react';
import './Signup.css';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const signupHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { error } = await db.auth.signUp({
      email,
      password,
    });

    if (error) {
      setIsError(true);
      setErrorText(error.message);
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
    <form onSubmit={signupHandler} className="signupForm">
      <h1>Sign up today!</h1>
      <p>Enter your details below to sign up.</p>
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
      <Input type="submit" value="Sign up" />
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
    <p className="error">
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
      <main className="signup">
        <SignupForm />
      </main>
    </>
  );
}
