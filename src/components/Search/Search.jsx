import React, { useEffect } from 'react';
import userService from '../../services/user.js';
import { UserContext } from '../../App.jsx';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Search () {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('user');
  const [searchResults, setSearchResults] = React.useState([]);
  const { username } = useParams();
  
  console.log(username);



  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await userService.findUser(searchQuery);
  //     const data = await response.data;
  //     setSearchResults(data);
  //   }
  //   fetchUser()
  //  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.findUser(searchQuery);
      setSearchResults(res.data);
    };
    if (searchQuery.length === 0 || searchQuery.length > 2) fetchData();
  }, [searchQuery]);

   const onChange = e => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // const findUser = (query) => {
  //   userService.findUser(query)
  //     .then(response => {
  //       console.log(response.status);
  //       setSearchResults(response.data);
  //     }).catch(e => {
  //        console.log(e);
  //        });
  // }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center my-4">
        <label htmlFor="search" className="mr-2 font-bold">
          Search for:
        </label>
        <select
          id="search"
          value={selectedOption}
          onChange={handleOptionChange}
          className="border border-gray-300 rounded-md p-2 w-20"
        >
          <option value="user">User</option>
        </select>
      </div>
      <div className="flex justify-center mt-4 mb-10">
        <input
          type="text"
          value={searchQuery}
          onChange={onChange}
          placeholder="Nhập tên người dùng..."
          className="border border-gray-300 rounded-md p-2 w-80"
        />
        {/* <button
          onClick={() => setSearchQuery}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-4 py-2 ml-2"
        >
          Tìm kiếm
        </button> */}
      </div>
      <div className="grid grid-cols-5 gap-12 flex-col flex-warp justify-center mx-5 mb-10">
        
        {searchQuery.length === 0 ? (
        <>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
          <div className="col-span-1 col-start-3">
            <span className="text-black-500 text-lg my-12 flex item-center"></span>
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
        </>
        ) : (
          searchResults.filter((results)=> {
            if (searchQuery == "") {
              return results
            } else if (results.username.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()).length == 0 ){
              return (
                <>
                  <div className="col-span-1"></div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1 col-start-3">
                    <span className="text-black-500 text-lg my-12 flex item-center">No Results</span>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1"></div>
                </>
              )
            } else if (results.username.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())) {
              return results
            }
          }).map((results) => (
          <Link to = {'/user/'+ results.id}>
            <div
              key={results.id}
              className="border-4 border-gray-300 rounded-2xl p-12 flex flex-col justify-center items-center hover:border-4 hover:border-gray-600 hover:rounded-2xl hover:hover:text-gray-600 hover:bg-slate-100"
            >
              <img
                src={results.avatarURL}
                alt="Avatar"
                className="w-40 h-40 rounded-full mb-2"
              />
              <p className="font-bold">{results.username}</p>
              <p>{`${results.lastName} ${results.firstName}`}</p>
              <p>{results.gender}</p>
              <p>{results.email}</p>
            </div>
          </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;