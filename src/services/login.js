import axios from 'axios';

class LoginService {
  async login(credential) {
    try {
      const response = await axios.post('/api/login', credential);
      
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const returnedUser = response.data;
      console.log(`Logged ${credential ? "in" : "out"} successfully: `, returnedUser);
      return returnedUser;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return null; // Invalid credential
      }
      throw new Error(error.message);
    }
  }

  storeUserToLocalStorage(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('loggedInUser');
    return JSON.parse(user);
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('loggedInUser');
  }

  async createNewAccount(credential) {
    try {
      const response = await axios.post('/api/users/', credential);
      
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const newUser = response.data;
      console.log("Create new user", newUser);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new LoginService();
