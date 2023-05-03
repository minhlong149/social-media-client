class LoginService {
  login(credential) {
    // logs in the user
    // returns the logged in user
    // returns null if the credential is invalid
    return {
      username: 'root',
      firstName: 'Test User',
    };
  }

  storeUserToLocalStorage(user) {
    // stores the logged in user in local storage
  }

  getUserFromLocalStorage() {
    // gets the logged in user from local storage
  }

  removeUserFromLocalStorage() {
    // removes the logged in user from local storage
  }

  createNewAccount(credential) {
    // creates a new account
  }
}

export default new LoginService();
