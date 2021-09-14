function if_logined_redirect_home(req, res, next){
    console.log("[if_logined_redirect_home] is invoked")
    
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

function if_not_logined_redirect_login(req, res, next){
    console.log("[if_not_logined_redirect_login] is invoked")
    
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    if_logined_redirect_home,
    if_not_logined_redirect_login,
}