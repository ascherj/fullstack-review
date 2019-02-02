const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  let repoSchema = mongoose.Schema({
    id: {
      type: Number,
      unique: true
    },
    name: String,
    owner: String,
    stargazers_count: Number,
    html_url: String
  });

  let Repo = mongoose.model('Repo', repoSchema);

  let save = (repo) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    var newRepo = new Repo({
      id: repo.id,
      name: repo.name,
      owner: repo.owner,
      stargazers_count: repo.stargazers_count,
      html_url: repo.html_url
    });

    newRepo.save((err, newRepo) => {
      if (err) return console.error(err);
      console.log('repo was saved');
    });
  }

  // let find = () => {
  //   Repo.find((err, repos) => {
  //     console.log('here are the saved repos:', repos);
  //   });
  // }

  module.exports.save = save;
  // module.exports.find = find;
});
