import React, { useState } from "react";

const SearchBar = ({setUserName, setIsLoading }) => {

    const [query, setQuery] = useState('');

  return (
    <>
        <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
    />
        <button className="btn btn-primary btn-block" onClick={() => {setUserName(query); setIsLoading(true)}}>Search</button>
    </>
  );
} 

export default SearchBar;