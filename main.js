var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

var cons = require('consolidate');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


//- Rutas

var routes = require('./http/routes');


var usuario = require('./http/routes/Usuario');
var Actor = require('./http/routes/Actor');
var Imagen = require('./http/routes/Imagen');
var Noticia = require('./http/routes/Noticia');
var Pelicula = require('./http/routes/Pelicula');
var Portada = require('./http/routes/Portada');
var Reparto = require('./http/routes/Reparto');
var Produccion = require('./http/routes/Produccion');



// - Conexion a la base de datos
//
var con = require('./http/connection');
//require('./conf/auth')(app);

// - Middlewares

var lessMiddleware = require('less-middleware')

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '/aplicacion/dist/'));
app.set("view engine", "html");

/* app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade"); */


app.use(favicon(path.join(__dirname, '/aplicacion/dist/', 'favicon.ico')))
/* app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico'))) */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use('/', routes);

app.use('/', usuario);
app.use('/', Actor);
app.use('/', Imagen);
app.use('/', Noticia);
app.use('/', Pelicula);
app.use('/', Reparto);
app.use('/', Portada);
app.use('/', Produccion);


app.use(lessMiddleware(__dirname + '/aplicacion/dist/'));

app.use(express.static(path.join(__dirname, 'aplicacion/dist/')));

/* app.use(lessMiddleware(__dirname + '/assets'));
app.use(lessMiddleware(__dirname + '/assets/frags'));

app.use(express.static(path.join(__dirname, 'assets'))); */
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
