import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = ({ updateUser, message }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const updateFormState = () => {
    setHasAccount(!hasAccount);
    console.log(`Switch to ${hasAccount ? 'register' : 'sign in'} component`);
  };

  return (
    <div className='grid h-screen place-items-center bg-blue-200'>
      <h1>{message}</h1>
      <div className='bg-white p-8'>
        {hasAccount ? (
          <LoginForm switchForm={updateFormState} updateUser={updateUser} />
        ) : (
          <SignupForm switchForm={updateFormState} updateUser={updateUser} />
        )}
      </div>
    </div>
  );
};

export default Login;
