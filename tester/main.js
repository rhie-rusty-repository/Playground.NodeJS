const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next)=>{
    console.log("첫번째 미들웨어");
    req.name = "RHIE";
    next();
})

app.use((req, res, next)=>{
    console.log("두번째 미들웨어");
    next();
})

app.get('/', (req, res) => {
    res.send(`Hello World! ${req.name}`)
})
  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})