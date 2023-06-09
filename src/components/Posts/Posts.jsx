import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import postService from '../../services/posts.js';
import ReactTimeAgo from 'react-time-ago';
import NavBar from '../Home/NavBar.jsx';

function Posts() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  let filter = 'popular';
  console.log(user);

  const retrievePosts = async () => {
    postService.getPostsForUser(user, filter, page)
      .then((response) => {
        console.log(response.data);
        setPosts(() => [...posts, ...response.data.posts]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    retrievePosts();
  }, []);

  const fetchLikes = async () => {
    const res = await postService.getPostsForUser(user, filter, page);
    setPosts((prevPosts) =>
      prevPosts.map((post) => ({
        ...post,
        likes: res.data.posts.find((p) => p.id === post.id)?.likes || [],
      })),
    );
  };


  const isMeLikeThisPost = async (post, isLikedByMe) => {
    var data = {"userId": user._id };
    let res;
    if(isLikedByMe)
    {
      res = await postService.unLike(post, user);
      console.log('Unlike this post');
      fetchLikes();
      return;
    } else {
      res = await postService.addLike(post, data, user);
      console.log('Like this post');
      fetchLikes();
      return;
    }
  }
  const handleClickUser = (user) => {
    navigate(`/${user.username}/friends`);
  };
  const handleClickPost = (post) => {
    navigate(`/post/${post.id}`);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    retrievePosts();
  }
 
  return (
    <section>
      <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
        <NavBar></NavBar>
        <div className='mx-4 md:mx-0 md:w-8/12'>
          {posts.map((post) => {
            const isLikedByMe = post.likes.includes(user._id);
            return (
              <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4'>
                <div className='flex gap-3'>
                  <div>
                    <a>
                      <span className='cursor-pointer' onClick={handleClickUser}>
                        <div className='w-12 rounded-full overflow-hidden'>
                          <img src={post.author.avatarURL} alt=''></img>
                        </div>
                      </span>
                    </a>
                  </div>
                  <div className='grow'>
                    <p>
                      <a href='/profile'>
                        <span className='mr1 font-semibold cursor-pointer hover:underline'>
                          {`${post.author.lastName} ${post.author.firstName}`}
                        </span>
                      </a>
                    </p>
                    <p class='text-gray-500 text-sm'>
                      <ReactTimeAgo date={post.createdAt} />
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
                  <p class='my-3 text-sm' onClick={() => handleClickPost(post)}>
                    {post.caption}
                  </p>
                  <div class='rounded-md overflow-hidden'>
                    <img src={post.mediaURL} alt='' />
                  </div>
                </div>
                <div className='mt-5 flex gap-8'>
                  <button
                    className='flex gap-2 items-center'
                    onClick={() => isMeLikeThisPost(post, isLikedByMe)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className={`w-6 h-6  ${
                        post.likes.includes(user._id) ? 'fill-red-500 stroke-none' : ''
                      }`}
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      ></path>
                    </svg>
                    {post.likes?.length}
                  </button>

                  <button className='flex gap-2 items-center' onClick={() => handleClickPost(post)}>
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
                    {post.comments?.length}
                  </button>
                  <button className='flex gap-2 items-center'>
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
                    {post.shares?.length}
                  </button>
                </div>
              </div>
            );
          })}

          <button className='w-full text-center py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:underline'
          onClick={handleLoadMore}>
          Load more</button>
        </div>
      </div>
    </section>
  );
}

export default Posts
