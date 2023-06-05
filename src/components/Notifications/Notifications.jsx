import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../App.jsx';
import NotificationsService from '../../services/notifications.js';
import { Notification } from './Notification.jsx';

function Notifications() {
  const { id: userId } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    const { notifications } = await NotificationsService.getNotificationsByUserId(userId);
    setNotifications(notifications);
  }

  useEffect(() => {
    getNotifications();
  }, []);
  useEffect(() => console.log('Load notifications', notifications), [notifications]);

  const [filter, setFilter] = useState('All');
  const filteredNotifications =
    filter === 'All'
      ? notifications
      : notifications.filter(({ notification }) => notification?.targetModel === filter);

  useEffect(() => {
    console.log(`Filter notifications by ${filter}`, filteredNotifications);
  }, [filteredNotifications]);

  const markAsRead = (notificationId) => async () => {
    try {
      console.log(`Marking notification ${notificationId} as read`);
      const update = await NotificationsService.markAsRead(userId, notificationId);
      setNotifications(update);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Notifications</h1>

      <div className='flex gap-4 w-8/12 mx-auto'>
        <nav className='flex flex-col gap-2'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-end'
            onClick={() => setFilter('All')}
          >
            All
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-end'
            onClick={() => setFilter('Post')}
          >
            Posts
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-end'
            onClick={() => setFilter('User')}
          >
            Friends
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-end'
            onClick={markAsRead('')}
          >
            Read all
          </button>
        </nav>

        <section className='flex flex-1 flex-col gap-2'>
          {filteredNotifications?.map((notification) => (
            <Notification
              key={notification._id}
              notification={notification}
              markAsRead={markAsRead}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Notifications;
