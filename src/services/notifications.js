import axios from 'axios';

class NotificationsService {
  async getNotificationsByUserId(userId) {
    try {
      const response = await axios.get(
        'http://localhost:3001/api/users/643f55e20459faca4050ec18/notifications',
      );
      // const response = await axios.get(`api/${userId}/notifications`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async markAsRead(userId, notificationId) {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${userId}/notifications/${notificationId}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

export default new NotificationsService();
