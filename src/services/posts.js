class PostService {
  getPostsForUser(user) {
    const posts = [
      {
        id: 1,
        caption: 'This is a post',
      },
      {
        id: 2,
        caption: 'This is another post',
      },
    ];
    
    return posts;
  }
}

export default new PostService();
