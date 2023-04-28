import React, { useState } from 'react';

import { LoginForm } from './LoginForm.jsx';
import { SignupForm } from './SignupForm.jsx';

import loginServices from '../../services/login.js';

function Login({ updateUser }) {
  const [hasAccount, setHasAccount] = useState(true);

  // The login form will take in the user's username and password and pass it to the login
  // function to be verified. If the login is successful, it will update the user
  // state with the user object returned by the login function, and store the user
  // to local storage.

  const login = (credential) => {
    const user = loginServices.login(credential);
    if (user !== null) {
      updateUser(user);
      loginServices.storeUserToLocalStorage(user);
    }
  };

  // If the user does not have an account, they can  switch to the signup form
  // by clicking the button, which will render a signup form instead.

  // The signup form will take in the user's username, password, and password confirmation,
  // and pass it to the signup function. This function creates a new user account
  // with the given credential and then signs the user in by calling the login function.

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
