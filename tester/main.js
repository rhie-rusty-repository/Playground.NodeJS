const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const crypto = require('crypto');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function base64encrypt(password, callback){
  crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) throw err;

      const encrypt_result = {
        saltVar: salt,
        hashVar: derivedKey.toString('hex')
      }

      console.log(encrypt_result);

      callback(encrypt_result);
    })
  })
}

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*** Create Schema ***/
const userSchema = new Schema({
  user_id: String, // String is shorthand for {type: String}
  password: String,
  username: String,
  salt: String,
  reg_date: { type: Date, default: Date.now },
},
  { collection: 'member' })

/*** Create Model ***/
const User = mongoose.model('Users', userSchema);

app.post("/process/register", function (req, res) {
  const user = new User();
  console.log(req.body);
  user.user_id = req.body.id;
  user.username = req.body.username;

  if (req.body.pw !== req.body.checkPw) {
    res.send("비밀번호가 일치하지 않음 : 회원가입 실패");
  } else {
    base64encrypt(req.body.pw, function(encrypt_result){
      user.salt = encrypt_result.saltVar
      user.password = encrypt_result.hashVar
      user.save();
      res.send("회원가입 성공");
    });
  }
})

app.post("/process/login", function (req, res) {
  const user_query = User.find();
  user_query.exec(function (err, user) {
    if (err) return handleError(err);

    console.log(`유저의 수: ${user.length}`)

    let saltVar = null;
    let origin_pw = null;
    let userInfo = null;
    
    for (let i = 0; i < user.length; i++) {
      if (user[i].user_id === req.body.id) {
        console.log("같은 ID 발견!!!");
        userInfo = user[i];
        break;
      }
    }

    saltVar = userInfo.salt;
    origin_pw = userInfo.password;

    crypto.scrypt(req.body.pw, saltVar, 64, (err, derivedKey) => {
      if (err) throw err;

      const hashVar = derivedKey.toString('hex');

      console.log(`DB에 저장되어 있는 PASSWORD : ${origin_pw}`)
      console.log(`사용자로부터 입력 받은 PASSWORD : ${hashVar}`)

      
      if (origin_pw === hashVar) {
        console.log("같다고 판단됨")
        res.send(`로그인 성공 : ${userInfo}`);
      }else{
        res.send("로그인 실패")
      }
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

