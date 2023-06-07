import React, { useState } from 'react';
import UserService from '../../services/user.js';
import PostService from '../../services/posts.js';

function Search() {
  const [results, setResults] = useState([]);
  const [searchQueryUser, setSearchQueryUser] = useState('');
  const [searchQueryPost, setSearchQueryPost] = useState('');

  const onSubmitUser = async (e) => {
    e.preventDefault();
    const user = await UserService.getUserByUsername(searchQueryUser);
    if (user) {
      setResults([user]);
    } else {
      setResults([]);
    }
  };

  const onSubmitPost = async (e) => {
    e.preventDefault();
    const posts = await PostService.getPostsForUser(searchQueryPost);
    if (posts.length > 0) {
      setResults(posts);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="App">
      <>User Search</>
      <br />
      <br />
      <form onSubmit={onSubmitUser}>
        <input
          type="search"
          placeholder="Find user"
          value={searchQueryUser}
          onChange={(e) => setSearchQueryUser(e.target.value)}
        ></input>
        <button>Find</button>
      </form>
      <br />
      <>Post Search</>
      <br />
      <br />
      <form onSubmit={onSubmitPost}>
        <input
          type="search"
          placeholder="Find post"
          value={searchQueryPost}
          onChange={(e) => setSearchQueryPost(e.target.value)}
        ></input>
        <button>Find</button>
      </form>
      <br />
      <h3>Result List</h3>
      {results.length === 0 && <p>No results found.</p>}
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.firstName || result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;