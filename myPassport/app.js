let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let app = express();
let config = require('./config');
let database = require('./database/database');
// var route_loader = require('./routes/route_loader');

// Passport
let passport = require('passport');
let flash = require('connect-flash')
let LocalStrategy = require('passport-local').Strategy;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
}))

// Passport 사용자 설정
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

database.connectAndLoad(app, config);

app.get('/', function (req, res) {
    console.log('/ 패스 요청됨.');
    res.render('index.ejs');
});

// 사용자 인증 성공 시 호출
passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출됨.');
    done(null, user);
});

// 사용자 인증 이후 사용자 요청 시마다 호출
passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출됨.');
    // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
    done(null, user);
});

app.get('/signup', function (req, res) {
    console.log('/signup 패스 요청됨');
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// passport 회원 가입 설정
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', //email과 password는 html form에 해당하는 name의 값
    passwordField: 'password',
    passReqToCallback: true,
}, function (req, email, password, done) {
    console.log("passport use local-signup");
    console.log(`${email} ::: ${password}`)
    const db = app.get('database');
    const UserModel = db.schema_model_items.UserModel;
    var paramName = req.body.name;
    console.log('passport의 local-signup signup 호출됨:' + email + ', ' + password + ', ' + paramName);

    UserModel.findOne({ 'username': email }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            //기존 메일이 있다면
            console.log('기존에 계정이 있음');
            return done(null, false, { message: req.flash('signupMessage', '이미 계정이 있음') });
        } else {
            
            // user = new UserModel({
            //     'username': email,
            //     'name': paramName,
            // });
            
            // 모델 인스턴스 객체 만들어 저장
            user = new UserModel();
            user.username = email;
            user.name = paramName;
            user.makeSalt();
            user.hashed_password = user.encryptPassword(password,user.salt);

            console.log(user);

            user.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log('사용자 데이터 추가함');
                return done(null, user);
            });
        }

    });


}));

app.get('/login',isAlreadyLogIn, function (req, res) {
    console.log('/login 패스 요청됨');
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log('passport의 local-login login 호출됨 : ' + email + ', ' + password);

    const db = app.get('database');
    const UserModel = db.schema_model_items.UserModel;
    UserModel.findOne({'username': email}, function (err, user) {
        console.log("passport use local-login");

        if (err) {
            return done(err);
        }

        // 등록된 사용자가 없는 경우
        if (!user) {
            console.log('계정이 일치하지 않음.');
            return done(null, false, req.flash('loginMessage','등록된 계정이 없습니다.'));
        }

        var authenticated = user.authenticate(password, user._doc.salt, user._doc.hashed_password);
        
        // 비밀번호 비교하여 맞지 않는 경우
        if (!authenticated) {
            console.log('비밀번호 일치하지 않음.');
            return done(null, false, req.flash('loginMessage','비밀번호가 일치하지 않습니다.'));
        }

        // 정상인 경우
        console.log('계정과 비밀번호가 일치함.');
        return done(null, user);
    });

}));

// 로그아웃
app.get('/logout', function (req, res) {
    console.log('/logout 패스 요청됨.');
    req.logout();
    res.redirect('/');
});


// 프로필 링크 - 먼저 로그인 여부를 확인할 수 있도록 isLoggedIn 미들웨어 실행
app.get('/profile', immigration, function (req, res) {
    console.log('/profile 패스 요청됨.');
    console.dir(req.user);
    res.render('profile.ejs', { user: req.user });

    // if (Array.isArray(req.user)) {
    //     res.render('profile.ejs', { user: req.user[0]._doc });
    // } else {
    //     res.render('profile.ejs', { user: req.user });
    // }

});


function isAlreadyLogIn(req, res, next){
    console.log('isAlreadyLogIn 미들웨어 호출됨.');
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

// 로그인 여부를 알 수 있도록 하는 미들웨어
function immigration(req,res,next){
    console.log('immigration 미들웨어 호출됨.');
    console.log(`is auth? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

app.listen(config.server_port, () => {
    console.log(`Example app listening at http://localhost:${config.server_port}`);
});






/*




passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  console.log('passport의 local-login login 호출됨 : ' + email + ', ' +
    password);

  var database = app.get('database');
  database.UserModel.findOne({
    'email': email
  }, function(err, user) {
    if (err) {
      return done(err);
    }

    // 등록된 사용자가 없는 경우
    if (!user) {
      console.log('계정이 일치하지 않음.');
      return done(null, false, req.flash('loginMessage',
        '등록된 계정이 없습니다.'));
    }

    // 비밀번호 비교하여 맞지 않는 경우
    var authenticated = user.authenticate(password, user._doc.salt,
      user._doc.hashed_password);
    if (!authenticated) {
      console.log('비밀번호 일치하지 않음.');
      return done(null, false, req.flash('loginMessage',
        '비밀번호가 일치하지 않습니다.'));
    }

    // 정상인 경우
    console.log('계정과 비밀번호가 일치함.');
    return done(null, user);
  });

}));


    // passport 회원 가입 설정
    // passport.use('local-signup', new LocalStrategy({
    //   usernameField: 'email',
    //   passwordField: 'password',
    //   passReqToCallback: true,
    // }, function(req, email, password, done) {
    //   var paramName = req.body.name;
    //   console.log('passport의 local-signup signup 호출됨:' + email + ', ' + password +
    //     ', ' + paramName);

    //   // User.fineOne이 blocking되므로  async 방식으로 변경할 수도 있음
    //   process.nextTick(function() {
    //     var database = app.get('database');
    //     database.UserModel.findOne({
    //       'email': email
    //     }, function(err, user) {
    //       if (err) {
    //         return done(err);
    //       }

    //       //기존 메일이 있다면
    //       if (user) {
    //         console.log('기존에 계정이 있음');
    //         return done(null, false, req.flash('signupMessage',
    //           '계정이 이미 있음'));
    //       } else {
    //         // 모델 인스턴스 객체 만들어 저장
    //          user = new database.UserModel({
    //           'email': email,
    //           'password': password,
    //           'name': paramName,
    //         });
    //         user.save(function(err) {
    //           if (err) {
    //             throw err;
    //           }
    //           console.log('사용자 데이터 추가함');
    //           return done(null, user);
    //         });
    //       }

    //     });
    //   });

    // }));




*/