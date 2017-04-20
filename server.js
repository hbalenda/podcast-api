const env        = require('./.env');
const express    = require('express');
const app        = express();
const request    = require('request');
const Feed       = require('rss-to-json');
const contentful = require('contentful')

const port = process.env.PORT || 8080; // set our port

// ROUTES
// =============================================================================

const router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

// /RSS
router.get('/rss', function(req, res) {
	Feed.load('http://feeds.soundcloud.com/users/soundcloud:users:203577071/sounds.rss', function(err, rss){
	   res.json(rss);
	})
});

// /ABOUT
router.get('/about', function(req, res) {
	const client = contentful.createClient({
	  space: ENV.SPACE_ID,
	  accessToken: ENV.ACCESS_TOKEN
	})
	client.getEntry(ENV.ABOUT_ENTRY_ID)
	  .then((response) => {
	  	res.json(response.fields)
	  })
	  .catch((error) => {
	  	res.json(error)
	  })
});

// REGISTER ROUTES ON /API
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
