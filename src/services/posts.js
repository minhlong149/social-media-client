import axios from "axios";

class PostService {
  getPostsForUser(user, filter, numOfPage ) {
    return axios.get(`/api/posts?userID=${user._id}&sortBy=${filter}&numOfPage=${numOfPage}`);
  }
  addLike(post, data, user) {
    return axios.post(`/api/posts/${post.id}/likes`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken,
      },
    });
  }
  // addComment(post, data, user) {
  //   return axios.post(`/api/posts/${post.id}/comments`, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + user.accessToken,
  //     },
  //   });
  // }
  unLike(post, user) {
    return axios.delete(`/api/posts/${post.id}/likes/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken,
      },
    });
  }
  getFullPost(postid) {
    return axios.get(`/api/posts/${postid}`);
  }

  getPostsByUser(user) {
    const posts = [
      {
        id: 3,
        caption: 'This is a post by a user',
        author: user.username,
      },
    ];

    return posts;
  }

  createPost(post, user) {
    return axios.post(`api/posts`, post, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   'Authorization': 'Bearer ' + user.accessToken,
      // },
    });
  }
  createComment = async (postid, newComment, user) => {
    return axios.post(`/api/${postid}/comments`, newComment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken,
      },
    });
  }
  
  updateComment = async (postid, id, updatedComment, user) => {
    try {
      const response = await api.put(`/${postid}/comments/${id}`, updatedComment);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  deleteComment = async (postid, id, user) => {
    try {
      await api.delete(`/&{postid}/comments/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}



export default new PostService();
