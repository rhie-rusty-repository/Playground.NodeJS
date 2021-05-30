const express = require('express')
const app = express()
const port = 3000

app.get('/cbchain', function(req,res,next){
  console.log('CB0');
  next();
}, function(req,res,next){
  console.log('CB1');
  next();
},function(req,res){
  res.send('Hello from C!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})