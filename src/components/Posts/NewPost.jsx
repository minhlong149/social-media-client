import React from 'react';
import postService from '../../services/posts.js';
function NewPost({ user }) {
  const [caption,setCaption] = useState('');
  const [hashtags,setHashtags] = useState('');
  const [content,setContent] = useState('');
  const [mediaURL, setMediaURL] = useState('');
  const [redirect, setRedirect] = useState(false);
  const handleCreatePost = () => {
    const post = getPostFromForm();
    postService.createPost(post);
  };

  const getPostFromForm = () => {
    // TODO: Get post from the form
    const data = new FormData();
    data.set('caption', caption);
    data.set('hashtags', hashtags);
    data.set('content', content);
    data.set('mediaURL', mediaURL);
    ev.preventDefault();
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  const Editor = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={createPost}>
      <input type="caption"
             placeholder={'Caption'}
             value={caption}
             onChange={ev => setCaption(ev.target.value)} />
      <input type="hashtags"
             placeholder={'Hashtags'}
             value={hashtags}
             onChange={ev => setHashtags(ev.target.value)} />
      <input type="mediaURL"
             onChange={ev => setMediaURL(ev.target.value)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}

export default NewPost;
