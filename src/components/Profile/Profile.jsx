import React, {useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

import postService from '../../services/posts.js';
import userService from '../../services/user.js';
import Post from '../Posts/Post.jsx';


import { Card, Row, Col} from 'react';

function Profile() {
  const { username } = useParams();
  const user = userService.getUserByUsername(username);
  const posts = postService.getPostsByUser(user);
  

  const [UserByUsernameData, setUserByUsernameData] = React.useState('');
  const [PostsByUserData, setgetPostsByUserData] = React.useState('');
  const [friendsData, setFriendsData] = React.useState('');
  const friends = [];

  // useEffect(() => {
  //   getUserByUsername();
  //   getPostsByUser();
  //   getFriends();
  //  }, []);


  //  const tabList = [
  //   {
  //     key: 'posts',
  //     tab: 'posts',
  //     data: posts
  //   },
  //   {
  //     key: 'friends',
  //     tab: 'friends',
  //     data: friends,
  //   },
  //   {
  //     key: 'information',
  //     tab: 'information',
  //     data: user,
  //   },
  // ];


  //  const getUserByUsername = () => {
  //   userService.getUserByUsername(username)
  //     .then((response) => {
  //       console.log(response.status);
  //       setUserByUsernameData(response.data);
        
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const getPostsByUser = () => {
  //   postService.getPostsByUser(user)
  //     .then((response) =>{
  //       console.log(response.status);
  //       setgetPostsByUserData(response.data)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // const getFriends = () => {
  //   userService.getFriends(user)
  //     .then((response) => {
  //       console.log(response.status);
  //       setFriendsData(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };


  return (
  //   <section>
  //     <Row gutter={16}>
  //   <Col span={8}>
  //     <Card title="Card title" bordered={false}>
  //       {getPostsByUser}
  //       <button onClick={getUserByUsername} type='primary'>
  //         Infomation
  //       </button>
  //     </Card>
  //   </Col>
  //   <Col span={8}>
  //     <Card title="Card title" bordered={false}>
  //       {getFriends}
  //     </Card>
  //   </Col>
  // </Row>
  //   </section>
  <section>
  <h2 className='text-xl font-bold'>Welcome to {user.firstName} profile</h2>
  {posts.map((post) => (
    <Post key={post.id} post={post} />
  ))}

  <Link to={`/${user.username}/friends`} state={user}>
    <button className='bg-sky-500 rounded text-white px-2 py-1'>View friend list</button>
  </Link>
  <Link >
    <button className='bg-sky-500 rounded text-white px-2 py-1'>Update information</button>
  </Link>
</section>
  );
}

export default Profile;
