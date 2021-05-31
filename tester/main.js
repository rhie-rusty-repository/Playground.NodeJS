const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/uploads')
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

app.post('/stats', upload.array('photo',1), function(req, res){
  console.log(req.files);
  res.send(req.files);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})