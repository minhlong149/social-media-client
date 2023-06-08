import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Login.css';

const Login = ({ updateUser, message }) => {
  const [hasAccount, setHasAccount] = useState(true);
  const updateFormState = () => {
    setHasAccount(!hasAccount);
    console.log(`Switch to ${hasAccount ? 'register' : 'sign in'} component`);
  };

  return (
    // <div className='grid h-screen place-items-center bg-gradient-to-r from-sky-500 to-indigo-500' class="fullcontent">
    <div class='fullcontent'>
      <div class="headings">
        <h1>Social Media</h1>
        <h2>Social Media helps you connect and share with the people in your life.</h2>
    </div>

      {/* <div className='bg-white p-6 rounded-lg min-h-fit'> */}
      <div class='form-container'>
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
