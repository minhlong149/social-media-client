import React, { useContext, useEffect, useState } from 'react';
import Profile from '../Profile/Profile.jsx';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App.jsx';
import postService from '../../services/posts.js';
import Post from './Post.jsx';
import { SignupForm } from '../Login/SignupForm.jsx';
import ReactTimeAgo from 'react-time-ago';
import userService from '../../services/user.js';
import NavBar from '../Home/NavBar.jsx';
function Posts() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState();
  console.log(user);
  const filter = 'popular';

  const retrievePosts = () => {
    postService.getPostsForUser(user)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => retrievePosts());
  useEffect(() => {
    async function fetchAuthors() {
      const authors = await Promise.all(
        posts.map(async (post) => {
          const response = await userService.getUserByUsername(post.author);
          const data = response.data;
          return data;
        }),
      );
      console.log(authors);
      setAuthors(authors);
    }
    fetchAuthors();
  }, [posts]);
  const handleClickUser = (user) => {
    navigate(`/${user.username}/friends`);
  };
  const handleClickPost = (posts) => {
    navigate(`/post/${posts.id}`);
  }
  const handleLikePost = (post) => {
    postService.addLike(post);
  }
  // const handleClickHome = () =>
  // {
  //   navigate(`/`);
  // }
  return (
    <section>
      <div className='md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0'>
        {/* <div className='fixed md:static w-full bottom-0 md:w-3/12 -mb-5'>
          <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5'>
            <div className='px-4 py-2 flex justify-between md:block shadow-md shadow-gray-500 md:shadow-none'>
              <a
                className='text-sm md:text-md flex gap-1 md:gap-3 py-3 my-1 bg-sky-600 text-white md:-mx-7 px-6 md:px-7 rounded-md shadow-md shadow-gray-300 items-center'
                onClick={handleClickHome}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>

                <span className='hidden md:block'>Home</span>
              </a>
              <a
                className='text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 px-6 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300 items-center'
                href='/friends'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                  ></path>
                </svg>
                <span className='hidden md:block'>Friends</span>
              </a>
              <a
                className='text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 px-6 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300 items-center'
                href='/saved'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                  ></path>
                </svg>
                <span className='hidden md:block'>Saved posts</span>
              </a>
             
              <a
                className='text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 px-6 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300 items-center'
                href='/settings'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>

                <span className='hidden md:block'>Setting</span>
              </a>
              <a
                className='text-sm md:text-md flex gap-1 md:gap-3 py-2 my-2 hover:bg-blue-500 hover:bg-opacity-20 md:-mx-4 px-6 md:px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300 items-center'
                href='/login'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                  ></path>
                </svg>
                <span className='hidden md:block'>Logout</span>
              </a>
            </div>
          </div>
        </div> */}
        <NavBar></NavBar>
        <div className='mx-4 md:mx-0 md:w-9/12'>
          {posts.map((post, index) => {
            return (
              <div className='bg-white shadow-md shadow-gray-300 rounded-md mb-5 p-4'>
                {authors[index] && (
                  <div className='flex gap-3'>
                    <div>
                      <a>
                        <span className='cursor-pointer' onClick={handleClickUser}>
                          <div className='w-12 rounded-full overflow-hidden'>
                            <img src={authors[index].avatarURL} alt=''></img>
                          </div>
                        </span>
                      </a>
                    </div>
                    <div className='grow'>
                      <p>
                        <a href='/profile'>
                          <span className='mr1 font-semibold cursor-pointer hover:underline'>
                            {`${authors[index].lastName} ${authors[index].firstName}`}
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
                )}
                <div>
                  <p class='my-3 text-sm' onClick={handleClickPost}>
                    {post.caption}
                  </p>
                  <div class='rounded-md overflow-hidden'>
                    <img
                      src='https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1170&amp;q=80'
                      alt=''
                    />
                  </div>
                </div>
                <div className='mt-5 flex gap-8'>
                  <button className='flex gap-2 items-center' onClick={() => handleLikePost(post)}>
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
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      ></path>
                    </svg>
                    {post.likes.length}
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
                        d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                      ></path>
                    </svg>
                    {post.comments.length}
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
                    {post.shares.length}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Posts
