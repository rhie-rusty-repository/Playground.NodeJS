const router = require('express').Router();
const { if_logined_redirect_home, if_not_logined_redirect_login } = require("../../middleware/access_control")

module.exports = {
    routers,
}

function routers() {
    //메인화면
    router.get('/', (req, res) => {
        res.render('index.html')
    })

    //로그인화면
    router.get('/login', if_logined_redirect_home, (req, res) => {
        res.render('login.html')
    })

    //회원가입화면
    router.get('/signup', if_logined_redirect_home, (req, res) => {
        res.render('signup.html')
    })

    //프로파일화면
    router.get('/profile', if_not_logined_redirect_login, (req, res) => {
        res.render('profile.html')
    })

    return router
}

