class PostService {
  getPostsForUser(user) {
    const posts = [
      {
        id: 1,
        caption: 'This is a post',
        author: user.username,
      },
      {
        id: 2,
        caption: 'This is another post',
        author: user.username,
      },
    ];

    return posts;
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
}

export default new PostService();
