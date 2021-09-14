var cookieSession = require('cookie-session')
var express = require('express')

var app = express()

// app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'sessi',
  keys: ['']
}))

app.get('/', function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1
  console.log(req.session.views)
  // Write response
  res.end(req.session.views + ' views')
})

app.listen(3000)

/***[just use it]***/
/*
app.use(client_session({
  name: 'client_session',
  keys: ["mysecret"],
}));
*/