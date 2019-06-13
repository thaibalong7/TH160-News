var express = require('express');
var handlebars = require('express-handlebars');
var handlebars_sections = require('express-handlebars-sections');
var body_parser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var wnumb = require('wnumb');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.engine("hbs", handlebars({
	defaultLayout: "main",
	layoutsDir: "views/layouts",
	helpers: {
		session: handlebars_sections(),
		number_format: n => {
			var nf = wnumb({
				thousand: ","
			});
			return nf.to(n);
		}
	}
}));

app.listen(process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json({ limit: "50mb" }));
app.use(body_parser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));



//Models
var models = require("./models");

//setting middleware
// require('./app/config/passport')(passport);

//Sync Database
models.sequelize.sync().then(function () {
	console.log('Nice! Database looks fine')
}).catch(function (err) {
	console.log(err, "Something went wrong with the Database Update!")
});

app.use("/", indexRouter);
app.use("/writers", require('./routes/writers'));
app.use('/api', require('./routes/api'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next();
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	console.log(err)
	res.render('error');
});



module.exports = app;
