var express = require('express');
var handlebars = require('express-handlebars');
var handlebars_sections = require('express-handlebars-sections');
var body_parser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var wnumb = require('wnumb');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);
var body_parser = require('body-parser');
var path = require('path');

var app = express();

app.engine("hbs", handlebars({	
	defaultLayout: "blog-post",
	layoutsDir: "views/layouts",
	helpers:{
		session: handlebars_sections(),
		number_format: n=>{
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));



// var sessionStore = new MySQLStore({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'msqlntk100397',
//     database: 'camera',
//     schema: {
//         tableName: 'sessions',
//         columnNames: {
//             session_id: 'session_id',
//             expires: 'expires',
//             data: 'data'
//         }
//     }
// });

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
// }));

app.use("/", indexRouter);
app.use("/blog-post", indexRouter);
app.get("/a",usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



module.exports = app;
