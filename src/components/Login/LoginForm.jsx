import React, { useState } from 'react';

const LoginForm = ({ switchForm, updateUser }) => {
  const handleLogin = (event) => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
      email: { value: email },
      saveInfo: { checked: saveInfo },
    } = event.target;
    const credential = { username, password, email, saveInfo };
    updateUser(credential);
  };

  return (
    <form
      className='w-full max-w-md mx-auto flex flex-col gap-5 border border-blue-500 rounded-lg px-6 py-8'
      onSubmit={handleLogin}
    >
      <h2 className='text-2xl font-bold mb-4 text-blue-500 text-center'>Login</h2>
      <div className='grid grid-cols-2 gap-2'>
        <label className='text-gray-700 font-medium self-center'>Username:</label>
        <input
          className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
          type='text'
          name='username'
          required
          placeholder='Enter your username'
        />
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <label className='text-gray-700 font-medium self-center'>Password:</label>
        <input
          className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
          type='password'
          name='password'
          required
          placeholder='Enter your password'
        />
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <label className='text-gray-700 font-medium self-center'>Email:</label>
        <input
          className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
          type='email'
          name='email'
          required
          placeholder='Enter your email'
        />
      </div>

      <input
        className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
        type='submit'
        value='Login'
      />

      <div className='flex justify-between items-center gap-2'>
        <label>
          <input className='cursor-pointer mr-1' type='checkbox' name='saveInfo' value='yes' />
          Remember me
        </label>

        <a className='hover:text-blue-500 hover:underline' href='#' onClick={switchForm}>
          Create new account
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
