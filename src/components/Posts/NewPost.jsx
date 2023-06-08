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
    // <form onSubmit={handleCreatePost}>
    //   <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
    //     <label>Add caption: 
    //   <input
    //     //className='col-span-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500' 
    //     type='text'
    //     placeholder={'Caption'}
    //     value={caption}
    //     onChange={(ev) => setCaption(ev.target.value)}
    //   />
    //   </label>
    //   </div>
    //   <input
    //     type='text'
    //     placeholder={'Hashtags'}
    //     value={hashtags}
    //     onChange={(ev) => setHashtags(ev.target.value)}
    //   />
    //   <input type='file' onChange={(ev) => setMediaURL(ev.target.files[0])} />
    //   <button className='bg-sky-500 rounded text-white px-2 py-1' type='submit'>
    //     Create post
    //   </button>
      
    // </form>
    <div>

    <h1 className=' my-bg-white shadow-md font-bold text-2xl'>Create Post</h1>
    <form onSubmit={handleCreatePost}>
        <div className='my-bg-white shadow-md shadow-gray-300 rounded-md mb-4 p-4'>
          <div className='mb-3'>
            <label className='block'>Caption</label>
              <input 
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className='border border-gray-400 w-1/2 p-1'        
                  placeholder='Enter caption'

              />
            </div>
        </div>
        <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-4 p-4'>
        <div className='mb-3'>
          <label className='block'>Hashtags</label>
            <textarea
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className='border border-gray-400 w-1/2 p-1'    
                placeholder='Enter hashtags'    
            />
            </div>
        </div>
        <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4'>
          <label className='block'>Content</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='border border-gray-400 w-1/2 p-1'    
                placeholder='Write something'    
            />
        </div>
        <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-4 p-4'>
        <div className='mb-3'>
          <label className='block'>Upload image</label>
            <input type='file' onChange={(ev) => setMediaURL(ev.target.files[0])} />
        </div>
        </div>
        <button className='bg-sky-500 rounded text-white px-2 py-1' type='submit'>
          Create post
        </button>
    </form>
  </div>
  );
}

export default NewPost;
