import axios from "axios";

class PostService {
  getPostsForUser(user) {
    return axios.get(`/api/posts?userID=${user._id}&sortBy=popular`);
  }
  addLike(post) {
    return axios.post(`/api/posts/${post.id}/likes`);
  }
  getFullPost(post) {
    const fullPost = {
      ...post,
      comments: [
        {
          id: 1,
          text: 'Since the post on the profile page only has the caption, we need to get the full post from the server.',
        },
        {
          id: 2,
          text: 'So that we can display the comments as well.',
        },
      ],
    };
    return fullPost;
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

  createPost(post) {
  }
}

export default new PostService();
