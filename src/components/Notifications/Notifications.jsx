import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../App.jsx';
import NotificationsService from '../../services/notifications.js';
import { Notification } from './Notification.jsx';

function Notifications() {
  const { id } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    const { notifications } = await NotificationsService.getNotificationsByUserId(id);
    setNotifications(notifications);
  }

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold text-center'
      >Notifications</h1>

      {notifications?.map((notification) => (
        <Notification key={notification._id} notification={notification} />
      ))}
    </div>
  );
}

export default Notifications;
