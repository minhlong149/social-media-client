import React, { useContext, useEffect } from 'react';

import userService from '../../services/user.js';
import { UserContext } from '../../App.jsx';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { notifyFriendRequest, notifyFriendRequestAccepted } from '../../services/socket.js';

function Friends() {
  const user = useContext(UserContext);
  const [friendsData, setFriendsData] = React.useState('');
  const [friendNav, setFriendNav] = React.useState('');
  const [friendsOfFriendsData, setFriendsOfFriendsData] = React.useState('');
  const friends = [];
  const requests = [];
  const fof = [];
  

  useEffect(() => {
   getFriends();
   getFriendsOfFriendsData();
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

  const getFriendsOfFriendsData = () => {
    userService.getFriendsOfFriends(user)
      .then((response) => {
        console.log(response.status);
        setFriendsOfFriendsData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      
  };


  for (let i in friendsData) {
    if (friendsData[i].status == 'accepted') {
      friends.push(friendsData[i]);
    } else if (friendsData[i].status == 'pending') {
      requests.push(friendsData[i]);
    }
  }
  for (let i in friendsOfFriendsData)
  {
    fof.push(friendsOfFriendsData[i]);
  }


  const denyRequest = (friendId) => {
    userService.denyRequest(user, friendId)
        .then(response => {
          console.log(response.status);
          setFriendsData(prevState => prevState.filter(friend => friend.friendId !== friendId))
        })
        .catch(e => {
        console.log(e);
        });
        
  };

  

  const acceptRequest = (friendId) => {
    userService.acceptRequest(user, friendId)
        .then(response => {
          console.log(response.status);
          setFriendsData(prevState => {
            const newFriendsData = [...prevState];
            const acceptedFriendIndex = newFriendsData.findIndex(friend => friend.friendId === friendId);
            if (acceptedFriendIndex !== -1) {
              newFriendsData[acceptedFriendIndex].status = 'accepted';
            }
            return newFriendsData;
          });
          notifyFriendRequestAccepted(friendId);
        })
        .catch(e => {
        console.log(e);
        });
        
  };

  const sendRequest = (friendId) => {
    let data = {
      friendId: friendId,
    }
    userService.sendRequest(user, data)
        .then(response => {
          console.log(response.status);
          setFriendsOfFriendsData(prevState => prevState.filter(friend => friend.friendId !== friendId))
          setFriendsData(prevState => {
            const newFriendsData = [...prevState];
            const requestedFriendIndex = newFriendsData.findIndex(friend => friend.friendId === friendId);
            if (requestedFriendIndex !== -1) {
              newFriendsData[acceptedFriendIndex].status = 'waiting';
            }
            return newFriendsData;
          });
          notifyFriendRequest(friendId);
        })
        .catch(e => {
        console.log(e);
        });
        
      }

  const navData = [
    {
      label: 'friends',
      title: 'Bạn bè',
      data: friends,
      deleteBtn: "Xoá bạn"
    },
    {
      label: 'requests',
      title: 'Lời mời kết bạn',
      data: requests,
      acceptBtn: 'Xác nhận',
      denyBtn: 'Xoá',
    },
    {
      label: 'recommends',
      title: 'Người bạn có thể quen',
      data: fof,
      addFriendBtn: 'Thêm bạn',
      deleteBtn: 'Xoá',
    },
  ];

 

  
  

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
        <TabPanel key='friends' value='friends' className='grid gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'>
          {navData[0].data.map((data) => (
            
              
                
                <div className='flex flex-col px-5 py-2 border border-gray-200 rounded-lg shadow border justify-center items-center'>
                <img className='rounded-full h-20 w-20' src={data.avatarURL.toString()}></img>
                <Link to={'/users/' + data.friendId.toString()}>
                  <strong>{data.firstName.toString()}</strong>
                  </Link>
                  <span>{data.sameFriend.toString()} bạn chung</span>
                  <button className='text-white bg-red-700 hover:bg-red-800 font-semibold rounded px-50 mt-1 mb-2 w-full'
                  onClick = { () =>denyRequest(data.friendId.toString())}>
                    {navData[0].deleteBtn}
                  </button>
                </div>
            
            
          ))}
        </TabPanel>

        <TabPanel key='requests' value='requests' className='grid gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10'>
          {navData[1].data.map((data) => (
            
              <div className='flex flex-col px-5 py-2 border border-gray-200 rounded-lg shadow justify-center items-center'>
                <img className='rounded-full h-20 w-20' src={data.avatarURL}></img>
  
                
                <Link to={'/users/' + data.friendId.toString()}>
                  <strong>{data.firstName.toString()}</strong>
                  </Link>
                  <span>{data.sameFriend.toString()} bạn chung</span>
                  
                  <button
                    className='text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded px-5 mt-1  w-full'
                    onClick = { () =>acceptRequest(data.friendId.toString())}
                  >
                    {navData[1].acceptBtn}
                  </button>
                  <button className='text-white bg-red-700 hover:bg-red-800 font-semibold rounded px-50 mt-1 mb-2 w-full'
                  onClick = { () =>denyRequest(data.friendId.toString())}>
                    {navData[1].denyBtn}
                  </button>
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
                  <span>{data.sameFriend.toString()} bạn chung</span>
                  
                  <button className='text-white bg-blue-700 hover:bg-blue-800 font-semibold rounded px-5 mt-1  w-full'
                  onClick={() => sendRequest(data.friendId.toString())}
                  >
                    {navData[2].addFriendBtn }
                  </button>
                  <button className='text-white bg-red-700 hover:bg-red-800 font-semibold rounded px-50 mt-1 mb-2 w-full'>
                    {navData[2].deleteBtn}
                  </button>
                </div>
            
          ))}
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}

export default Friends;
