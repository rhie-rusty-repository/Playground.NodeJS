const LocalStrategy = require('passport-local').Strategy

module.exports.login = new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true //request 객체
}, function(req, username, password, done){
    // done(err, user, flash message)
    console.log(`[inform]invoked passport's local login : ${username}, ${password}`)

    const Member = req.app.get('db_model_list')['member'];

    Member.findOne({ username: username }, (err, user) => {
        if (err) { return done(err) }

        if(!user) { return done(null, false)}

        const isAuthenticated = user.authenticate(password);

        if(!isAuthenticated) { return done(null, false)}

        return done(null, user);
    })
})

module.exports.signup = new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true //request 객체
}, function(req, username, password, done){
    console.log(`[inform]invoked passport's local signup : ${username}, ${password}`)

    const Member = app.get('db_model_list')['member'];

    Member.findOne({ username: username }, (err, user) => {
        if (err) { return done(err) }

        if (user)  { return done(null, false) }

        const new_user = new Member({
            username: username,
            name: req.body.name
        })
        new_user.makeEncryptedPassword(password);
        new_user.save(err => { return done(null, new_user)})
    })
})
