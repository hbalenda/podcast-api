const Feed = require('rss-to-json');

module.exports = function(req, res) {
  Feed.load('http://feeds.soundcloud.com/users/soundcloud:users:203577071/sounds.rss', function(err, rss){
     res.json(rss);
  })
};
