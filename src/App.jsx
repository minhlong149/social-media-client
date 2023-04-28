import React, { useEffect, useState } from 'react';

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import LoginServices from './services/login.js';

// The App component takes care of the user's authentication status.
// If the user is authenticated, it renders the Home component.
// If the user is not authenticated, it renders the Login component.

function App() {
  const [user, setUser] = useState(null);
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  // If a user is logged in, set the user to the logged in user
  // This is used to keep the user logged in if they refresh the page

  useEffect(() => {
    const foundUser = LoginServices.getUserFromLocalStorage();
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  const logout = () => {
    LoginServices.removeUserFromLocalStorage();
    setUser(null);
  };

  return (
    <>{user !== null ? <Home user={user} logout={logout} /> : <Login updateUser={updateUser} />}</>
  );
}

export default App;
