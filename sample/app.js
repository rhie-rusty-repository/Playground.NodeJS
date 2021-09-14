const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const server_session = require('express-session');
const { serverConfig } = require("./config/configurations");
const database = require("./database/mongodb");

// View Setting
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))

// Static
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Parsing
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(server_session({
    secret : 'new hackerton',
    resave : true,
    saveUninitialized : false,
}));

// Request Logging on Console
app.use("/", (req,res)=>{
    console.log({
        method : req.method,
        url : req.url,
    });
    req.next();
});

// Passport 
const passport = require('passport');
const flash = require('connect-flash'); //passport에 flash message 기능이 있는데, passport가 이놈을 사용해
const immigration = require('./lib/immigration');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
immigration.init(passport);
app.set('passport', passport);

// Database
database.init(app, serverConfig)

require("./routes/route_loader").init(app);

const httpServer = app.listen(serverConfig.port, ()=>{
    console.log(`app listening at http://localhost:${serverConfig.port}`)
});
