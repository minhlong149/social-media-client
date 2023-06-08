import { io } from 'socket.io-client';

const url = 'http://localhost:3001';
export const socket = io(url, { autoConnect: false });

export function notifyFriendRequest(friendId) {
  console.log('Sending friend request to user', friendId);
  socket.emit('friendRequest', friendId);
}

export function notifyFriendRequestAccepted(friendId) {
  console.log('Sending friend request accepted to user', friendId);
  socket.emit('friendRequestAccepted', friendId);
}