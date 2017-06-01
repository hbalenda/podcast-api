const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// SET PORT
const port = process.env.PORT || 7000;

// USE BODYPARSER I GUESS
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// SET ACCESS CONTROL HEADERS FOR DEV
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

router.get('/rss', require('./routes/rss'));
router.get('/content', require('./routes/content'));
router.post('/send-email', require('./routes/sendemail'))

// REGISTER ROUTES
app.use('', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
