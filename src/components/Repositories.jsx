import React, { useEffect } from "react";

const Repositories = ({ userName, octokit, totalRepos }) => {
    let [repoList, setRepoList] = React.useState([]);
    let [page, setPage] = React.useState(1);
    let [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        setIsLoading(true);
        octokit.request("GET /users/{username}/repos", {
            username: userName,
            page: page,
            per_page: 10
        }).then(({ data }) => {
            console.log(data);
            setRepoList(data);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }, [userName, page]);

    return (
        <>
            {isLoading ? <h1>Loading...</h1> : 
                <>
                    {
                        repoList.map((repo) => {
                            return (
                                <div key={repo.id}>
                                    <h1>{repo.name}</h1>
                                    <p>{repo.description}</p>
                                    <p>{repo.language}</p>
                                    <p>{repo.updated_at}</p>
                                </div>
                            );
                        })
                    }
                    <button disabled={page == 1} onClick={() => setPage(page - 1)}>Previous</button>
                    <button disabled={totalRepos/10 + (totalRepos%10 != 0) <= page} onClick={() => setPage(page + 1)}>Next</button>
                </>
            }
        </>
    );

};

export default Repositories;