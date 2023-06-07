import axios from "axios";

class PostService {
  getPostsForUser(user) {
    return axios.get(`/api/posts?userID=${user._id}&sortBy=popular`);
  }
  addLike(post, data) {
    return axios.post(`/api/posts/${post.id}/likes`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2Y1NWUwMDQ1OWZhY2E0MDUwZWMwNCIsImlhdCI6MTY4NjE2NTE0OSwiZXhwIjoxNjg2MjUxNTQ5fQ.k2izz0znBiTFkNgYluqz9EX4KQvPBHnmILhrxP4-D8Q'
      },
    });
  }
  unLike(post, user) {
    return axios.delete(`/api/posts/${post.id}/likes/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2Y1NWUwMDQ1OWZhY2E0MDUwZWMwNCIsImlhdCI6MTY4NjE2NTE0OSwiZXhwIjoxNjg2MjUxNTQ5fQ.k2izz0znBiTFkNgYluqz9EX4KQvPBHnmILhrxP4-D8Q'
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

  createPost(post) {}
}

export default new PostService();
