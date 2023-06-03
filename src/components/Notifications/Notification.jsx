import React from 'react';
import { Link } from 'react-router-dom';

export function Notification({ notification }) {
  if (!notification.notification) {
    return <></>;
  }

  const url = getNotificationUrl(notification);
  const image = getUserImageUrl(notification);
  const message = getNotificationMessage(notification);
  
  return (
    <Link to={url}>
      <section className='flex items-center gap-2 w-full p-2 hover:bg-gray-100
      '>
        <img
          src={image}
          alt='user avatar'
          className='w-10 h-10 rounded-full'
          width={40}
          height={40}
        />
        <p className='block'>{message}</p>
      </section>
    </Link>
  );
}

function getUserImageUrl({ notification }) {
  return notification.user?.avatarURL || '';
}

function getNotificationUrl({ notification }) {
  switch (notification.type) {
    case 'post':
    case 'comment':
    case 'like':
      return `/posts/${notification.target}`;
    default:
      return '';
  }
}

function getNotificationMessage({ notification }) {
  switch (notification.type) {
    case 'post':
      return `${notification.user.firstName} posted a new post`;
    case 'comment':
      return `${notification.user.name} commented on your post`;
    case 'like':
      return `${notification.user.name} liked your post`;
    default:
      return '';
  }
}
