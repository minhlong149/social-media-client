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
    return axios.get('http://localhost:80/api/users/'+ user._id+'/friendsoffriends');
   
  }

  getFriends(user) {
    return axios.get('http://localhost:80/api/users/'+ user._id+'/friends');
  }

  acceptRequest(user, friendId)
  {
    return axios.put('http://localhost:80/api/users/'+ user._id+'/friends/' + friendId);
  }

  denyRequest(user, friendId)
  {
    return axios.delete('http://localhost:80/api/users/'+ user._id+'/friends/' + friendId);
  }

  sendRequest(user, friend)
  {
    return axios.post('http://localhost:80/api/users/'+ user._id+'/friends/', friend);
  }


}


export default new UserService();
