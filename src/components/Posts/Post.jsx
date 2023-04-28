import React from 'react';


function Post({ post }) {
  return (
    <section>
      <p>{post.caption}</p>
    </section>
  )
}

export default Post;
