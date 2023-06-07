import React, { useEffect, useState } from 'react';

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import loginServices from './services/login.js';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);


export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  const login = (credential) => {
    const user = loginServices.login(credential);
    if (user !== null) {
      setUser(user);
      loginServices.storeUserToLocalStorage(user);
    }
  };

  const logout = () => {
    loginServices.removeUserFromLocalStorage();
    setUser(null);
  };

  useEffect(() => {
    const foundUser = loginServices.getUserFromLocalStorage();
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      {user !== null ? (
        <UserContext.Provider value={user}>
          <Home logout={logout} />
        </UserContext.Provider>
      ) : (
        <Login login={login} />
      )}
    </>
  );
}

export default App;
