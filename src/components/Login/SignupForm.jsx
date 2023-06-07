import React, { useState } from 'react';

const SignupForm = ({ switchForm, updateUser }) => {
  const [password, setPassword] = useState('');
  const handleSignup = (event) => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
      confirmPassword: { value: confirmPassword },
      email: { value: email },
    } = event.target;
    const credential = { username, password, confirmPassword, email };
    console.log('Signup detail: ', credential);
    updateUser(credential);
  };

  return (
    <div className='flex justify-center'>
      <form
        className='w-full max-w-md flex flex-col gap-4 border border-blue-500 rounded-lg px-6 py-8'
        onSubmit={handleSignup}
      >
        <h2 className='text-2xl font-bold mb-4 text-blue-500 text-center'>Register</h2>
        <div className='grid grid-cols-2 gap-2'>
          <label className='text-gray-700 font-medium self-center'>Username:</label>
          <input
            type='text'
            name='username'
            required
            className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
            placeholder='Enter your username'
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <label className='text-gray-700 font-medium self-center'>Password:</label>
          <input
            type='password'
            name='password'
            required
            onChange={({ target }) => setPassword(target.value)}
            className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
            placeholder='Enter your password'
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <label className='text-gray-700 font-medium self-center'>Confirm password:</label>
          <input
            type='password'
            name='confirmPassword'
            required
            pattern={password}
            onInvalid={({ target }) => target.setCustomValidity("Password doesn't match")}
            className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
            placeholder='Confirm your password'
          />
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <label className='text-gray-700 font-medium self-center'>Email:</label>
          <input
            type='email'
            name='email'
            required
            className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
            placeholder='Enter your email'
          />
        </div>

        <input
          className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
          type='submit'
          value='Sign Up'
        />

        <p className='text-center text-gray-600'>
          Already have an account?{' '}
          <a
            className='hover:text-blue-500 hover:underline cursor-pointer'
            href='#'
            onClick={switchForm}
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
