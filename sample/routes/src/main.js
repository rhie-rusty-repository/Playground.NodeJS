const router = require('express').Router();

module.exports = {
    params : ['passport'],
    routers,
}

function routers(passport) {
    router.post('/login',passport.authenticate('local-login',{
        successRedirect: '/',
        failureRedirect: '/login',
    }));

    router.post('/signup',passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
    }));

    router.post('/check/login', (req,res)=>{
        const isLogin = req.isAuthenticated();
        res.send({isLogin});
    });

    router.get('/logout', (req,res)=>{
        req.logout();
        res.redirect('/');
    })

    return router;
}