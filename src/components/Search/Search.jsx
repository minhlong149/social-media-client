import React from 'react';
import userService from '../../services/user.js';
import JSONDATA from '../../MOCK_DATA.json';

function Search () {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('user');
  const [searchResults, setSearchResults] = React.useState('');


   const onChange = e => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const find = (query, by) => {
    userService.find(query, by)
      .then(response => {
        console.log(response.status);
        setSearchResults(response.data);
      }).catch(e => {
         console.log(e);
         });
  }
  const findByUsername = () => {
    find(searchQuery, "username");
  }

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
        <button
          onClick={findByUsername}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-4 py-2 ml-2"
        >
          Tìm kiếm
        </button>
      </div>
      <div className="grid grid-cols-5 gap-12 flex-col flex-warp justify-center mx-20 mb-10">
        {searchResults.length === 0 ? (
          <p className="text-black-500 text-lg my-12 flex item-center">No results</p>
        ) : (
          searchResults.map((results) => (
            <div
              key={results._id}
              className="border border-gray-300 rounded-2xl p-12 flex flex-col justify-center items-center"
            >
              <img
                src={results.avatarURL}
                alt="Avatar"
                className="w-40 h-40 rounded-full mb-2"
              />
              <p className="font-bold">{results.username}</p>
              <p>{`${results.firstName} ${results.lastName}`}</p>
              <p>{results.gender}</p>
              <p>{results.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;