const express    = require('express');
const app        = express();
const request    = require('request');
const Feed       = require('rss-to-json');
const contentful = require('contentful');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080; // set our port
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
	  space: process.env.SPACE_ID,
	  accessToken: process.env.ACCESS_TOKEN
	})
	client.getEntry(process.env.ABOUT_ENTRY_ID)
	  .then((response) => {
	  	res.json(response.fields)
	  })
	  .catch((error) => {
	  	res.json(error)
	  })
});

// REGISTER ROUTES
app.use('', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
