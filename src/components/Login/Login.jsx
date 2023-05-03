import React, { useState } from 'react';

import { LoginForm } from './LoginForm.jsx';
import { SignupForm } from './SignupForm.jsx';
import loginServices from '../../services/login.js';

function Login({ login }) {
  const [hasAccount, setHasAccount] = useState(true);

  const signup = (credential) => {
    loginServices.createNewAccount(credential);
    login(credential);
  };

  return (
    <div>
      {/* The form to login or signup */}
      {hasAccount ? <LoginForm login={login} /> : <SignupForm signup={signup} />}

      {/* The button to switch between the login and signup forms */}
      <button onClick={() => setHasAccount(!hasAccount)}>
        Switch to {hasAccount ? 'Sign up' : 'Login'} page
      </button>
    </div>
  );
}

export default Login;
