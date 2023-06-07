class UserService {
  getUserByUserId(userId) {
    return axios.get('http://localhost:3000/api/users/'+ user._id);
  }

  getFriends(user) {
    return axios.get('http://localhost:3000/api/users/'+ user._id+'/friends');
  }

}

export default new UserService();
