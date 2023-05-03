class UserService {
  getUserByUsername(username) {
    return {
      username: 'john',
      firstName: 'John',
    };
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
