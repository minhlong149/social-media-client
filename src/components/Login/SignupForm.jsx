import React from 'react';

// This code shows a signup form.
// It allows you to enter a username and password and then click a button to sign up.

// It does not actually sign you up, but instead calls a function that is passed as a prop to the component.
// The function that is passed as a prop is called when the button is clicked,
// and it is passed an object with the username and password as properties.

export function SignupForm({ signup }) {
  const handleSignup = () => {
    const credential = getCredentialsFromForm();
    signup(credential);
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
      <h1 className='text-2xl font-bold'>Sign up</h1>
      <button className=' bg-sky-500 rounded text-white px-2 py-1' onClick={handleSignup}>
        Sign up
      </button>
    </div>
  );
}
