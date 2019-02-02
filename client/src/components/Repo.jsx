import React from 'react';

const Repo = (props) => (
  <div className="repo">
    <div>{props.repo.id}</div>
    <div>{props.repo.name}</div>
    <div>{props.repo.owner}</div>
    <div>{props.repo.stargazers_count}</div>
    <div>{props.repo.html_url}</div>
    <br/>
  </div>
)

export default Repo;