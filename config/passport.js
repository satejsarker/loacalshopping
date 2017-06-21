var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
        done(null, user.id);
    }

);
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
passport.use('local.singup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, function(req, email, password, done) {
    req.checkBody({
        'email': {
            optional: {
                options: { checkFalsy: true } // or: [{ checkFalsy: true }]
            },
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        'password': {
            notEmpty: true,
            isLength: {
                options: [{ min: 3 }],
                errorMessage: ' password must be 4 char' // Error message for the validator, takes precedent over parameter message
            },
            errorMessage: 'Invalid Password' // Error message for the parameter
        }

    });
    var errors = req.validationErrors();

    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({ 'email': email }, function(err, user) {
        if (err) {
            return done(err);

        }
        if (user) {
            return done(null, false, { message: 'email is already register' });

        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);

        });

    });

}));
passport.use('local.singin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        req.checkBody({
            'email': {
                optional: {
                    options: { checkFalsy: true } // or: [{ checkFalsy: true }]
                },
                isEmail: {
                    errorMessage: 'Invalid Email'
                }
            },
            'password': {
                notEmpty: true,

                errorMessage: 'Invalid Password' // Error message for the parameter
            }

        });
        var errors = req.validationErrors();

        if (errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));

        }
        User.findOne({ 'email': email }, function(err, user) {
            if (err) {
                return done(err);

            }
            if (!user) {
                return done(null, false, { message: 'No user found' });

            }
            if (user == "admin@local.com") {
                var admin = "admin";
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'password not Invalid' });
                }
                return done(null, admin, admin);
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'password not Invalid' });
            }
            return done(null, user);

        });

    }));