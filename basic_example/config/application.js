const path = require('path');
const fs = require('fs');
const multer = require('multer');

module.exports.serverConfig = {
    port : 3000,
    //Use OpenSSL
    httpsOpts : {
        key: fs.readFileSync(path.join(__dirname, 'certificates/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certificates/cert.pem')),
        passphrase: '1234'
    }
}

module.exports.uploadConfig = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, path.join(__dirname, '../uploads'))
        },
        filename: function (req, file, callback) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        }
      }),
    limits: {
      files: 10,
      fileSize: 1024 * 1024 * 1024
    }
});