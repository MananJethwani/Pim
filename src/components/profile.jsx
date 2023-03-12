import React, { useEffect, useState } from "react";
import Repositories from "./Repositories";

const Profile = ({ user, octokit, isLoading, setIsLoading }) => {

    const [profileData, setProfileData] = useState({});
    const [isValidUser, setIsValidUser] = useState(false);

    useEffect(() => {
        console.log("here");
        octokit.request("GET /users/{username}", {
            username: user
        }).then(({ data }) => {
            console.log(data);
            setIsLoading(false);
            setIsValidUser(true);
            setProfileData(data);
        }).catch((err) => {
            setIsLoading(false);
            setIsValidUser(false);
            console.log(err);
        });
    }, [user]);

    return (
        <div>
            {
            isLoading ? <h1>Loading...</h1> : isValidUser ? 
                <>
                    <div>
                        <h1>{profileData.name}</h1>
                    </div>
                    <Repositories userName={user} octokit={octokit} totalRepos={profileData.public_repos}/>
                </> : <h1>Invalid User</h1>
            }
        </div>
    );
};

export default Profile;