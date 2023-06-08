import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Post({ post }) {
  const {author, caption, mediaURL, likes, comments, hashtags } = post;
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  const [comment, setComment] = useState(post.comment)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  const commentHandle =() => {

  }
  return (
    <section>
      <div className="post">
          <div className='image'>
            <Link to={'post/id'}>
              <img src={mediaURL} alt=""/>
            </Link>
          </div>
          <div>
            <span className="postCaption">{post.caption}</span>
          </div>
          <div>
            <span className="postLikes">{post.likes}</span>
          </div>
          <div>
            <span className="postComments">{post.comments}</span>
          </div>
          <div>
            {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{post.likes}</span>
          </div>
          <div>
            <span className="postComments">{post.comments && <comments postId={id} postAuthor={author}/>} </span>
          </div>

      </div>     
      <Link to={`/${post.author || 'posts'}/${post.id}`} state={post}>
        <button className='bg-sky-500 rounded text-white px-2 py-1'>View</button>
      </Link>
    </section>
  );
    
}

export default Post;
