const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  getReposByUsername(req.body.username, (repos) => {
    console.log(`got ${repos.length} repos from ${req.body.username} on GitHub`);

    var promises = repos.map((repo, index) => {
      console.log('creating promise', index);
      return Promise.resolve(db.save(repo));
    });

    Promise.all(promises)
      .then(() => {
        console.log('all repos were saved');
        res.send('');
      });
  });
});

app.get('/repos', function (req, res) {
  db.getTop25((top25) => {
    console.log('got the top 25', top25);
    res.send(JSON.stringify(top25));
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

