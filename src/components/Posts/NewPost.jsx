import React from 'react';

import postService from '../../services/posts.js';

function NewPost({ user }) {
  const handleCreatePost = () => {
    const post = getPostFromForm();
    postService.createPost(post);
  };

  const getPostFromForm = () => {
    // TODO: Get post from the form
    return {
      id: 4,
      caption: 'This is a post created by user',
      author: user.username,
    };
  };

  return (
    <section>
      <h1>Create new post</h1>
      <button className='bg-sky-500 rounded text-white px-2 py-1' onClick={handleCreatePost}>
        Add post
      </button>
    </section>
  );
}

export default NewPost;
