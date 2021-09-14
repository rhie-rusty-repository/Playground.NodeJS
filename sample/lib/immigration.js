const { login , signup } = require('./passport_strategy/local-strategy');

module.exports.init = function(passport){
    // Strategy가 성공하면 호출됨
    // `done(null, user)`로부터 user를 받고 세션에 저장
    // 세션의 위치 : `req.session.passport.user`
    passport.serializeUser(function(user, done){
        console.log("[inform]the serializeUser function has been invoked")
        done(null, user);
    })

    // serializeUser의 done()에서 넘겨준 user를 받는다.
    // (저장된 세션 정보 req.session.passport.user와 DB를 조회해 비교할 수도 있음)
    // 다시 done()을 호출하고 세션에 정보를 넘긴다.
    passport.deserializeUser(function(user, done){
        console.log("[inform]the deserializeUser function has been invoked")
        done(null, user);
    })

    passport.use('local-login',login)
    passport.use('local-signup',signup)
}