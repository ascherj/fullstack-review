import React from 'react';

const Repo = (props) => (
  <div className="repo">
    <br/>
    <div>Repo ID: {props.repo.id}</div>
    <div>Repo name: {props.repo.name}</div>
    <div>Repo owner: {props.repo.owner}</div>
    <div>Star count: {props.repo.stargazers_count}</div>
    <div><a href={props.repo.html_url}>{props.repo.html_url}</a></div>
  </div>
)

export default Repo;