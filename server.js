var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	config = require('./config/config.js');
	passport = require("passport");
	LocalStrategy = require('passport-local').Strategy;
	var passport = require('passport');
	var flash    = require('connect-flash');

	var morgan       = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser   = require('body-parser');
	var session      = require('express-session');

	require('./config/passport')(passport); // pass passport for configuration

	// set up our express application
	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({ secret: 'thisisasecret' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	require('./routes/api.js')(app, passport);

	var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());


app.listen(port);
console.log("listing")