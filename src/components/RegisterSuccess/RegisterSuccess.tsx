import ToolBar from '../ToolBar/ToolBar';
import Button from '../Button/Button';

import './RegisterSuccess.css';

export default function RegisterSuccess() {
  return (
    <>
      <ToolBar />
      <main className="registerSuccessContainer">
        <div className="registerSuccess">
          <h1>Congratulations</h1>
          <p>
            You should now have an sign-up confirmation email. Confirm your
            email to access the application.
          </p>
          <p>Or you can login if you already have an account</p>
          <Button text="Login Screen" route="/login" />
        </div>
      </main>
    </>
  );
}
