const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const database = require('./database');
const security = require('./security');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/process/register", function (req, res) {
  const user = new database.UserModel();
  console.log(req.body);
  user.user_id = req.body.id;
  user.username = req.body.username;

  if (req.body.pw !== req.body.checkPw) {
    res.send("비밀번호가 일치하지 않음 : 회원가입 실패");
  } else {
    security.base64encrypt(req.body.pw, function(encrypt_result){
      user.salt = encrypt_result.saltVar
      user.password = encrypt_result.hashVar
      user.save();
      res.send("회원가입 성공");
    });
  }
})

app.post("/process/login", function (req, res) {
  const user_query = database.UserModel.find();

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

    if(!userInfo){
      res.send("해당 아이디가 없습니다.")
    }


    saltVar = userInfo.salt;
    origin_pw = userInfo.password;

    security.base64decrypt(req.body.pw, origin_pw, saltVar, function(result){
      if (result) {
        console.log("같다고 판단됨")
        res.send(`로그인 성공 : ${userInfo}`);
      }else{
        res.send("비밀번호가 틀렸습니다. 실패")
      }
    });

  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})