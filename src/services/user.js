import axios from "axios";

class UserService {
  // getUserByUsername(searchQueryUser) {
  //   return {
  //     username: 'john',
  //     firstName: 'John',
  //     email: 'john@gmail.com',
  //   };
  // }

  find(query, by = "username") {
    return axios.get(
    `http://localhost:3000/api/users?${by}=${query}}`
    )
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
