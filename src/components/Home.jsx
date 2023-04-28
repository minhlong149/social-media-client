import React from 'react';

// The Home function defines the home page for the social media app.

function Home({ user }) {
  return (
    <>
      <h1>Hello, {user.firstName}</h1>
    </>
  );
}

export default Home;
