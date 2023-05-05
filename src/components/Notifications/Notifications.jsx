import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Notifications() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  return <section>{user.username || 'Ops!'}</section>;

  async function getUser() {
    const user = await axios.get('api/users/643f55e00459faca4050ec04');
    setUser(user.data);
  }
}

export default Notifications;
