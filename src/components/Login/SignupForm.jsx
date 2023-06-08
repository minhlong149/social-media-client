import React, { useState } from 'react';
// import loginServices from '../../services/login.js';

const SignupForm = ({ switchForm, updateUser }) => {
  const [password, setPassword] = useState('');
  const handleSignup = (event) => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
      email: { value: email },
      firstName: { value: firstName },
      lastName: { value: lastName },
      dob: { value: dob },
      gender: { value: gender },
    } = event.target;

    const [day, month, year] = dob.split('-');
    const dateOfBirth = new Date(year, month - 1, day);

    const credential = {
      username,
      password,
      email,
      firstName,
      lastName,
      dateOfBirth,
      gender,
    };
    console.log('Signup detail: ', credential);
    updateUser(credential);
  };

  return (
    <div className='flex justify-center'>
      <form
        className='w-full max-w-md flex flex-col gap-4 border border-blue-500 bg-white rounded-3xl px-6 py-8'
        onSubmit={handleSignup}
      >
        <h2 className='text-2xl font-bold mb-4 text-blue-500 text-center'>Register</h2>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <input
              type='text'
              name='firstName'
              required
              className='border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full'
              placeholder='Firstname'
            />
          </div>
          <div>
            <input
              type='text'
              name='lastName'
              required
              className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full'
              placeholder='Surname'
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <input
            type='text'
            name='username'
            required
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full'
            placeholder='Enter your username'
          />
        </div>

        <div className='grid gap-2'>
          <input
            type='email'
            name='email'
            required
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full'
            placeholder='Enter your email'
          />
        </div>

        <div className='grid gap-2'>
          <input
            type='password'
            name='password'
            required
            onChange={({ target }) => setPassword(target.value)}
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 w-full'
            placeholder='Create new password'
          />
        </div>

        <div className='grid grid-cols-1 gap-2'>
          <div>
            <label className='text-gray-700 font-medium self-center'>Date of birth</label>
            <input
              type='date'
              name='dob'
              required
              className='border border-gray-300 ml-1 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
              style={{ width: '100%', maxWidth: '300px' }}
            />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2'>
          <label className='text-gray-700 font-medium self-center'>Gender:</label>
          <div>
            <input
              type='radio'
              id='male'
              name='gender'
              value='male'
              required
              className='border border-gray-300 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-500'
            />
            <label htmlFor='male' className='text-gray-700 ml-1'>
              Male
            </label>
          </div>
          <div>
            <input
              type='radio'
              id='female'
              name='gender'
              value='female'
              required
              className='border border-gray-300 rounded-full p-2 focus:outline-none focus:ring focus:border-blue-500'
            />
            <label htmlFor='female' className='text-gray-700 ml-1'>
              Female
            </label>
          </div>
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
