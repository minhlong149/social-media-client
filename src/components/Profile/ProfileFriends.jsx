import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Button } from '@material-tailwind/react';
import userService from '../../services/user.js';
import { Link } from 'react-router-dom';

function Friends() {
  const user = useContext(UserContext);
  const [friendsData, setFriendsData] = React.useState('');
  const [friendNav, setFriendNav] = React.useState('');
  const friends = [];
  
useEffect (() => {
  getFriends();
}, []);

const getFriends = () => {
  userService.getFriends(user)
    .then((response) => {
      console.log(response.status);
      setFriendsData(response.data);
      
    })
    .catch((e) => {
      console.log(e);
    });
};


for (let i in friendsData) {
  if (friendsData[i].status == 'accepted') {
    friends.push(friendsData[i]);
  }
}

const navData =[
  {
    label: 'friends',
    title: 'Bạn bè',
    data: friends,
  }
]
  return (
    <Tabs value={friendNav}>
      <TabsHeader
        className='pt-5 border border-transparent border-b-gray-200 text-gray-500 font-semibold cursor-pointer justify-around'
        indicatorProps={{
          className: '',
        }}
      >
        {navData.map(({ title, label }) => (
          <Tab 
            key={label}
            value={label}
            onClick={() => setFriendNav(label)}
            className={friendNav === label ? 'text-blue-500 border border-transparent border-b-blue-600 border-2 rounded-t-lg' : 'hover:border hover:border-transparent hover:border-b-gray-300 hover:border-2 hover:text-gray-600'}
          >
            {title}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
      <TabPanel key='requests' value='requests' className='grid gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'>
          {navData[1].data.map((data) => (
            <div className='flex flex-col px-5 py-2 border border-gray-200 rounded-lg shadow justify-center items-center'>
            <img className='rounded-full h-20 w-20' src={data.avatarURL}></img>
              <Link to={'/users/' + data.friendId.toString()}>
                <strong>{data.firstName.toString()}</strong>
              </Link>
            </div>
          ))}
      </TabPanel>
      <TabPanel key='recommends' value='recommends' className='grid gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'>
          {navData[2].data.map((data) => (
            <div className=' flex flex-col px-5 py-2 border border-gray-200 rounded-lg shadow justify-center items-center'>
            <img className=' rounded-full h-20 w-20' src={data.avatarURL.toString()}></img>
              <Link to={'/users/' + data.friendId.toString()}>
                <strong>{data.firstName.toString()}</strong>
              </Link>
            </div>
          ))}
      </TabPanel>
      </TabsBody>
      </Tabs>
  );
}

export default Friends;
