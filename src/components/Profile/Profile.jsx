import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../App.jsx';
import { useParams, Link } from 'react-router-dom';

import postService from '../../services/posts.js';
import userService from '../../services/user.js';
import Post from '../Posts/Post.jsx';


import { Card, Row, Col} from 'react';

function Profile() {
  const user = useContext(UserContext);
  const posts = postService.getPostsByUser(user);
  
  const [UserData, setUserData] = React.useState('');
  const [PostsByUserData, setgetPostsByUserData] = React.useState('');


  useEffect(() => {
    getUser();
   }, []);

   const getUser = () => {
    userService.getUser(user)
      .then((response) => {
        console.log(response.status);
        setUserData(response.data);
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPostsByUser = () => {
    postService.getPostsByUser(user)
      .then((response) =>{
        console.log(response.status);
        setgetPostsByUserData(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
  <section>
    <div class="flex p-6 font-mono">
      <div class="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
        <img src={user.avatarURL} alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <form class="flex-auto pl-6">
          <div class="flex flex-wrap">
            <h1 class="flex-auto text-lg font-semibold text-slate-900">
              {user.firstName} {user.lastName}
            </h1>
          </div>
          <div class="flex items-baseline mt-2 mb-2 pb-2">
            <div class="space-x-2 flex text-sm">
              <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                Email: {user.email}
              </div>
            </div>
          </div>
          <div class="flex items-baseline mt-0 mb-6 pb-6 border-b border-slate-200">
            <div class="space-x-2 mb-2 flex text-sm">
              <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                Số điện thoại: {user.phone}
              </div>
            </div>
          </div>
          <div class="flex space-x-4 mb-6 text-sm font-medium">
            <div class="flex-auto flex space-x-4">
              <Link to={`/${user.username}/friends`} state={user}>
                <button className='bg-sky-500 rounded text-white px-2 py-1'>View friend list</button>
              </Link>
              <Link to={`/settings`}>
                <button className='bg-sky-500 rounded text-white px-2 py-1'>Update Profile</button>
              </Link>
            </div>
          </div>
      </form>
    </div>
  </section>
  );
}

export default Profile;
