const request = require('request');
const token = require('../config.js').TOKEN || process.env.GITHUB_TOKEN;

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.log('something went wrong...');
      console.log('error:', error);
      console.log('status code:', response && response.statusCode);
    } else {
      let repos = JSON.parse(body).map((repo) => {
        return {
          id: repo.id,
          name: repo.name,
          owner: repo.owner.login,
          stargazers_count: repo.stargazers_count,
          html_url: repo.html_url
        };
      });
      callback(repos);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;