import axios from "axios";

class UserService {
  getUserByUsername(username) {
    return {
      username: 'john',
      firstName: 'John',
    };
  }

  getFriendsOfFriends(user)
  {
    return axios.get('api/users/'+ user.id+'/friendsoffriends');
   
  }

  getFriends(user) {
    return axios.get('/api/users/'+ user.id+'/friends');
  }

  acceptRequest(user, friendId)
  {
    return axios.put('api/users/'+ user.id+'/friends/' + friendId);
  }

  denyRequest(user, friendId)
  {
    return axios.delete('api/users/'+ user.id+'/friends/' + friendId);
  }

  sendRequest(user, friend)
  {
    return axios.post('api/users/'+ user.id+'/friends/', friend);
  }


}


export default new UserService();
