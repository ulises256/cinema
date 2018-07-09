var db = require('../relaciones');
var passport = require('passport'); //Agregamos el passport
var jwt = require('jsonwebtoken'); //Agregamos jsonwebtoken
var localStrategy = require('passport-local').Strategy; //Agregamos el tipo de estrategia
var facebookStrategy = require('passport-facebook').Strategy; //Agregamos facebook
var config = require('../../conf/oauth.js')

var usuario = db.usuario;
var avatar = db.avatar;
var secret = 'lazukulencia'; //creamos una variable para el token

var ex = module.exports = {};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

ex.create = function(req, res, next) {
    usuario.create(req.body).then(user  => {
        res.status(200).jsonp(user);
    });
};

ex.delete = function(req, res, next) {
    usuario.findById(req.params.id)
    .then(usuario => usuario.destroy())
    .then(result => res.status(200).jsonp(result))
};

ex.update = function(req, res, next) {
    usuario.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).jsonp({msj: 'SUCCESS!'}));
};

ex.read = function(req, res, next) {

    req.params.id ? 
    usuario.findById(id, {
        include : ['Avatar']
    }).then(usuario => res.status(200).jsonp(usuario))
    :
    usuario.findAll().then(usuarios => res.status(200).jsonp(usuarios));
};

ex.login = function(req, res, next) {

    var data = req.body;
    // console.log(req.body);

    passport.authenticate('login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: 'Incorrect username or password.'});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

};

ex.token = function(req, res, next) {
    jwt.verify(req.params.token, secret, function(err, decoded) {
        err ? res.send({success: false, message: 'token invlid'}) : res.json(decoded)
    });
}

ex.registro = function(req, res, next) {
    passport.authenticate('registro', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: info});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({
                user: user
            }, secret, {expiresIn: '24h'});
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });
    })(req, res, next);

};

passport.use('login', new localStrategy({

    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, username, password, done) {
    usuario.findOne({
        include : ['Avatar'],
        where: {
            'correo': username
        }
    }).then(function(user) {
        if (user == null) {
            return done(null, false)
            console.log('no se encontro un usuario');
        }
        if (password == user.password) {
            return done(null, user)
        }
        return done(null, false)
    })
}))

passport.use('registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    usuario.find({
        include : ['Avatar'],
        where: {
            'correo': username
        }
    }).then(function(user) {
        if (user) {
            return done(null, false);
        } else {
            usuario.create(req.body).then(function(user) {
                avatar_fb = 'assets/images/perfil.png'
                avatar.create({ id_usuario : user.id, fb_avatar: avatar_fb })
                return done(null, user);

            }, function(err) {
                throw err;
            });
        }
    }, function(err) {
        done(err, null);
    });
}));

ex.facebook = function(req, res, next) {
    passport.authenticate('facebook', {scope: ['email', 'user_location']})(req, res, next);
}

ex.facebookcallback = function(req, res, next) {
    passport.authenticate('facebook', {
        successRedirect: '/token',
        failureRedirect: '/'
    })(req, res, next);
}

passport.use('facebook', new facebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
        'id',
        'emails',
        'displayName',
        'picture',
        'cover',
        'first_name',
        'last_name',
        'locale',
        'gender',
        'hometown'
    ]
}, function(accessToken, refreshToken, profile, done) {
    profile.photos != undefined ? avatar_fb = profile.photos[0].value : avatar_fb = 'assets/images/perfil.png'
    process.nextTick(function() {
        usuario.find({
            include : ['Avatar'],
            where: {
                'fb_id': profile.id
            }
        }).then(function(user) {
            if (user) {
                avatar.update({ fb_avatar: avatar_fb },{ where: { id_usuario: user.id }});
                user.update({nombre: profile.name.givenName, apellidos: profile.name.familyName})
                done(null, user);
            } else {
                var nuevousuario = {
                    nombre: profile.name.givenName,
                    correo: profile.emails[0].value,
                    apellidos: profile.name.familyName,
                    sexo: profile.gender,
                    fb_id: profile.id,
                    fb_token: accessToken
                }

                usuario.create(nuevousuario).then(data => {
                    avatar.create({ id_usuario : data.id, fb_avatar: avatar_fb })

                    return done(null, data);

                }, function(err) {
                    throw err;
                });
            }
        }, function(err) {
            return done(err);
        });
    });
}));

ex.avatar = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        usuario.findById(id, {
			include : ['Avatar']
		}).then(function(usuario) {
            var avatar
            usuario? avatar = usuario.avatar : null;
            res.status(200).jsonp(avatar);
        });
    } else {
        usuario.findAll().then(function(usuarios) {
            res.status(200).jsonp(usuarios);
        });
    }
};