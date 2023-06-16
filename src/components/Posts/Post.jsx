import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../App.jsx';
import {  useParams } from 'react-router-dom';
import postService from '../../services/posts.js';
import ReactTimeAgo from 'react-time-ago';
import CommentForm from './CommentForm.jsx';


function Post() {
  const user = useContext(UserContext);
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState("");

  const { postid } = useParams();
  // console.log(postid);
  // console.log(user);
  useEffect(() => {
    async function fetchPost() {
      const response = await postService.getFullPost(postid);
      const data = await response.data;
      setPost(data);
      setAuthor(data.author);
      setLiked(data.likes.some((like) => like.id === user._id));
    }
    fetchPost();

  }, [postid]);
  

   const fetchLike = async () => {
     const res = await postService.getFullPost(postid);
     await setPost(res.data);
     setLiked(res.data.likes.some((like) => like.id === user._id ));
   };

  const isMeLikeThisPost = async (post, isLikedByMe) => {
    var data = {"userId": user._id };
    let res;
    if(isLikedByMe)
    {
      res = await postService.unLike(post, user);
      console.log('Unlike this post');
      await fetchLike();
      return;
    } else {
      res = await postService.addLike(post, data, user);
      console.log('Like this post');
      await fetchLike();
      return;
    }
  }
  
  //AddComments
    // const [submitted, setSubmitted] = useState(false);
    // const saveComment = () => {
    //     var data = {
    //         comment: comment,
    //         postId: postid,
    //         user: user
    //     }
    //     postService.addComment(post, data, user)
    //     .then(response => {
    //         setSubmitted(true);
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     })
    // }
    const addComment = async (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      const createdComment = await postService.createComment(postid, newComment, user);
      setComments((prevComments) => [...prevComments, createdComment]);
    };
  
    // const editComment = async (updatedComment, index) => {
    //   setComments((prevComments) => {
    //     const updatedComments = [...prevComments];
    //     updatedComments[index] = updatedComment;
    //   });
    //   const updated = await postService.updateComment(postid, id, updatedComment);
    //   setComments((prevComments) =>
    //     prevComments.map((comment) => (comment.id === id ? updated : comment))
    //   );
    // };
  
    // const deleteComment = (index) => {
    //   setComments(async (prevComments) => {
    //     const updatedComments = [...prevComments];
    //     updatedComments.splice(index, 1);
    //     await postService.deleteComment(postid, id);
    //     setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    //   });
      
    // };
    // const handleCreateComment = async (postid, newComment) => {
    //   const createdComment = await postService.createComment(postid, newComment);
    //   setComments((prevComments) => [...prevComments, createdComment]);
    // };
  
    // const handleUpdateComment = async (postid, id, updatedComment) => {
    //   const updated = await postService.updateComment(postid, id, updatedComment);
    //   setComments((prevComments) =>
    //     prevComments.map((comment) => (comment.id === id ? updated : comment))
    //   );
    // };
  
    // const handleDeleteComment = async (postid, id) => {
    //   await postService.deleteComment(postid, id);
    //   setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    // };

  console.log(postid);
  // console.log(liked);
  console.log(comments);
  return Object.keys(post).length === 0 ? (
    <section>
      <div className='justify-items-center m-10'>
        <div className='text-center '>
          <div role='status'>
            <svg
              aria-hidden='true'
              class='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span class='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section>
      <div>
        <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
          <div className='fixed md:static w-full bottom-0 md:w-1/12 -mb-5'>
            <div>
              <button
                className='flex gap-2 items-center my-10 '
                title={post.likes.map((like) => like.lastName + ' ' + like.firstName).join(', ')}
                onClick={() => isMeLikeThisPost(post, liked)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className={`w-6 h-6  ${liked ? 'fill-red-500 stroke-none' : ''}`}
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  ></path>
                </svg>
                {post.likes?.length ?? 0}
              </button>
              <button
                className='flex gap-2 items-center my-10'
                title={post.comments
                  .map((comment) => comment.lastName + ' ' + comment.firstName)
                  .join(', ')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                  ></path>
                </svg>
                {post.comments?.length ?? 0}
              </button>
              <button
                className='flex gap-2 items-center my-10'
                title={post.shares
                  .map((share) => share.lastName + ' ' + share.firstName)
                  .join(', ')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
                  ></path>
                </svg>
                {post.shares?.length ?? 0}
              </button>
            </div>
          </div>
          <div className='mx-4 md:mx-0 md:w-9/12'>
            <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4'>
              <div className='flex gap-3'>
                <div>
                  <a>
                    <span className='cursor-pointer'>
                      <div className='w-12 rounded-full overflow-hidden'>
                        <img src={author.avatarURL} alt=''></img>
                      </div>
                    </span>
                  </a>
                </div>
                <div className='grow'>
                  <p>
                    <a href={`/${post.author.id}`}>
                      <span className='mr1 font-semibold cursor-pointer hover:underline'>
                        {`${author.lastName} ${author.firstName}`}
                      </span>
                    </a>
                  </p>
                  <p class='text-gray-500 text-sm'>
                    <ReactTimeAgo date={post?.createdAt} />
                  </p>
                </div>
                <div className='relative'>
                  <button className='text-gray-400'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-6 h-6'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                      ></path>
                    </svg>
                  </button>
                  <div class='relative'></div>
                </div>
              </div>
              <div>
                <p class='my-3 text-sm'>{post.caption}</p>
                <div class='rounded-md overflow-hidden'>
                  <img src={post.mediaURL} alt='' />
                </div>
              </div>
            </div>
    
            <div>
              <CommentForm submitComment={addComment} />
            </div> 

            <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-10 p-5 text-3xl   font-semibold'>
              Comment
              {post.comments && post.comments.length != 0 ? (
                post.comments.map((comment) => {
                  return (
                    <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-3 text-lg font-bold'>
                      <div className='flex gap-3'>
                        <div>
                          <a>
                            <span className='cursor-pointer'>
                              <div className='w-12 rounded-full overflow-hidden'>
                                <img src={comment?.userID.avatarURL} alt=''></img>
                              </div>
                            </span>
                          </a>
                        </div>

                        <div className='grow'>
                          <p>
                            <a href={`/${comment?.userID.id}`}>
                              <span className='mr1 font-semibold text-base cursor-pointer hover:underline'>
                                {`${comment?.userID.lastName} ${comment?.userID.firstName}`}
                              </span>
                            </a>
                          </p>
                          <p class='text-gray-500 text-sm'>
                            <ReactTimeAgo date={comment?.createdAt} />
                          </p>
                        </div>
                      </div>
                      <div>
                        <p class='my-3 ml-11 mr-3 text-sm font-normal'>
                        {comment?.text} 
                      </p>
                      </div>                     
                    </div>
                  );
                })
              ) : (
                <p className='text-gray-500 text-justify text-sm font-light '>No comment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Post;