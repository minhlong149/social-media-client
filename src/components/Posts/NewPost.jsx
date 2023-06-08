import React, { useState } from 'react';
import postService from '../../services/posts.js';
function NewPost({ user }) {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [content, setContent] = useState('');
  const [mediaURL, setMediaURL] = useState('');
  const [redirect, setRedirect] = useState(false);
  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = getPostFromForm();
    // postService.createPost(post);
  };

  const getPostFromForm = () => {
    // TODO: Get post from the form
    const data = new FormData();
    data.append('caption', caption);
    data.append('hashtags', hashtags);
    data.append('content', content);
    data.append('mediaURL', mediaURL);

    // Log the data to the console
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    return data;
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input
        type='text'
        placeholder={'Caption'}
        value={caption}
        onChange={(ev) => setCaption(ev.target.value)}
      />
      <input
        type='text'
        placeholder={'Hashtags'}
        value={hashtags}
        onChange={(ev) => setHashtags(ev.target.value)}
      />
      <input type='file' onChange={(ev) => setMediaURL(ev.target.files[0])} />
      <button className='bg-sky-500 rounded text-white px-2 py-1' type='submit'>
        Create post
      </button>
    </form>
  );
}

export default NewPost;
