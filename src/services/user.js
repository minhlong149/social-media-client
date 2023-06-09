import axios from "axios";

class UserService {

  findUser(searchQuery) {
    return axios.get(`/api/users?username=${searchQuery}`)
  }

  getUser(user) {
    return axios.get('/api/users/'+ user._id);
  }

  getFriends(user) {
    return axios.get('/api/users/'+ user._id+'/friends');
  }

  getUserByUsername(userId) {
    return axios.get(`/api/users/${userId}`);
  }

  getFriendsOfFriends(user)
  {
    return axios.get('api/users/'+ user._id+'/friendsoffriends');
   
  }

  getFriends(user) {
    return axios.get('/api/users/'+ user._id+'/friends');
  }

  acceptRequest(user, friendId)
  {
    return axios.put('api/users/'+ user._id+'/friends/' + friendId);
  }

  denyRequest(user, friendId)
  {
    return axios.delete('api/users/'+ user._id+'/friends/' + friendId);
  }

  sendRequest(user, friend)
  {
    return axios.post('api/users/'+ user._id+'/friends/', friend);
  }


}


export default new UserService();
