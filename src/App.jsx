import React, { useEffect, useState } from 'react';

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import loginServices from './services/login.js';

export const UserContext = React.createContext();

function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const updateUser = async (user) => {
    try {
      if (user == null) {
        // Handle logout
        loginServices.removeUserFromLocalStorage();
        setUser(null);
        return;
      }

      if (user.confirmPassword) {
        // Handle creating a new user
        const returnedUser = await loginServices.createNewAccount(user);
        // Login automatically after creating a new user
        user.username = returnedUser.username;
        user.password = returnedUser.password;
        user.email = returnedUser.email;
      }

      // Handle user login
      const returnedUser = await loginServices.login(user);
      setUser(returnedUser);

      // Save user info if saveInfo is true
      user.saveInfo && loginServices.storeUserToLocalStorage(user);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    // Check if there is a logged-in user in local storage
    const loggedUserJSON = loginServices.getUserFromLocalStorage();
    setUser(loggedUserJSON);
  }, []);

  return (
    <>
      {user !== null ? (
        // Render Homepage component if user is logged in
        <UserContext.Provider value={user}>
          <Home user={user} updateUser={updateUser} />
        </UserContext.Provider>
      ) : (
        // Render Login component if user is not logged in
        <Login updateUser={updateUser} message={message} />
      )}
    </>
  );
}

export default App;
