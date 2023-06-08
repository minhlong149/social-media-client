import React, { useState } from 'react';
import postService from '../../services/posts.js';
function NewPost({ user }) {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
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
    data.append('mediaURL', mediaURL);

    // Log the data to the console
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    return data;
  };

  return (

    <div>

    <h1 className='container mx-auto px-4 font-bold text-2xl'>Create Post</h1>
    <form onSubmit={handleCreatePost}>
        <div className=' my-bg-white container mx-auto px-6 rounded-md mb-4 p-4'>
          <div className='mb-3'>
            <label className='block'>Caption</label>
              <input 
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className='border shadow-md border-gray-400 w-1/2 p-1'        
                  placeholder='Enter caption'

              />
            </div>
        </div>
        <div className='container mx-auto px-6 bg-white rounded-md mb-4 p-4'>
        <div className='mb-3'>
          <label className='block'>Hashtags</label>
            <textarea
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className='border shadow-md border-gray-400 w-1/2 p-1'    
                placeholder='Enter hashtags'    
            />
            </div>
        </div>
        <div className='container mx-auto px-6 bg-white rounded-md mb-4 p-4'>
        <div className='mb-3'>
          <label className='block'>Upload image</label>
            <input type='file' onChange={(ev) => setMediaURL(ev.target.files[0])} />
        </div>
        </div>
        <button className='bg-sky-500 rounded text-white px-2 py-1 mx-24 my-5' type='submit'>
          Create post
        </button>
    </form>
  </div>
  );
}

export default NewPost;
