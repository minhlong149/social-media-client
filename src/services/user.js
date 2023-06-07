import axios from "axios";

class UserService {
  getUserByUsername(userId) {
    return axios.get(`/api/users/${userId}`);
  }

  getFriends(user) {
    return [
      {
        id: 1,
        firstName: 'Jane',
      },
      {
        id: 2,
        firstName: 'Jack',
      },
    ];
  }
}

export default new UserService();
