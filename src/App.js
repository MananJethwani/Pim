import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Octokit } from "@octokit/core";
import Profile from './components/profile';

function App() {

  let [userName, setUserName] = useState("");
  let [octokit, setOctokit] = useState(null);
  let [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const octokit = new Octokit({
      auth: ""
    });
    setOctokit(octokit);
    console.log("here");
  }, []);

  useEffect(() => {
    console.log(userName);
    console.log(octokit);
  }, [userName]);
  
  return (
    <div className={"App" + (darkMode ? " dark-mode" : "")}>
      <button onClick={() => {setDarkMode(!darkMode)}}> {darkMode ? "set to light mode" : "set to dark mode"}</button>
      <SearchBar setUserName={setUserName} setIsLoading={setIsLoading} />
      {
        octokit && userName ? <Profile user={userName} octokit={octokit} setIsLoading={setIsLoading} isLoading = {isLoading} /> : <></>
      }
    </div>
  );
}

export default App;
