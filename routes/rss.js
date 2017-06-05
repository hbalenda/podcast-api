var FeedMe = require('feedme');
var http = require('http');

module.exports = function(req, res) {
  http.get('http://feeds.soundcloud.com/users/soundcloud:users:301028661/sounds.rss', function(response) {
    var parser = new FeedMe(true);
    const rss = { items: [] };
    parser.on('item', function(item) {
      parsedDescription = item.description.replace(/(?:\r\n|\r|\n)/g, '\n\n');
      rss.items.push({
        'title': item.title,
        'description': parsedDescription,
        'link': item.link,
        'enclosure': item.enclosure
      });
    });
    response.pipe(parser);
    parser.on('end', function() {
      res.json(rss);
    });
  });
};
