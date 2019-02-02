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

    var newRepo = new Repo({
      id: repo.id,
      name: repo.name,
      owner: repo.owner,
      stargazers_count: repo.stargazers_count,
      html_url: repo.html_url
    });

    newRepo.save((err, newRepo) => {
      if (err) return console.error(err.message);
      console.log('repo was saved');
    });
  };

  let getTop25 = (callback) => {
    Repo.find()
      .limit(25)
      .sort({ stargazers_count: -1 })
      .exec((err, results) => {
        console.log('top 25 repos', results);
        callback(results);
      });
  };

  module.exports.save = save;
  module.exports.getTop25 = getTop25;
});
