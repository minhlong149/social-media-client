import React from 'react';

// This code shows a login form.
// It allows you to enter a username and password and then click a button to log in. 

// It does not actually log you in, but instead calls a function that is passed as a prop to the component.
// The function that is passed as a prop is called when the button is clicked, 
// and it is passed an object with the username and password as properties.

export function LoginForm({ login }) {
  const handleLogin = () => {
    const credential = getCredentialsFromForm();
    login(credential);
  };

  const getCredentialsFromForm = () => {
    // TODO: Get credential from the form
    return {
      username: 'root',
      password: '123456',
    };
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>Login</h1>
      <button className='bg-sky-500 rounded text-white px-2 py-1' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
