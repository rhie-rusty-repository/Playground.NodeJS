const express = require('express')
const app = express()
const https = require('https')
const path = require('path')
const serverConfig = require('./config/application').serverConfig
const uploadConfig = require('./config/application').uploadConfig

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))





/*************************Sample Section*************************/
const multipartEx = require("./routes/example/multer")
multipartEx.setting(app, uploadConfig);
/****************************************************************/
https.createServer(serverConfig.httpsOpts, app).listen(serverConfig.port,()=>{
    console.log(`app listening at http://localhost:${serverConfig.port}`);
});
