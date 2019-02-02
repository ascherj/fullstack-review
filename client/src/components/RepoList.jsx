import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Here are the top {props.repos.length} repos.
    {props.repos.map((repo) => {
      return <Repo repo={repo} key={repo._id}/>
    })}
  </div>
)

export default RepoList;