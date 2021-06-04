const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { MongoClient } = require("mongodb");

app.use('/static', express.static(path.join(__dirname, 'public')))

/*** 데이터베이스 ***/
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("local").command({ ping: 1 });
    console.log("MongoDB server has received heart beat~!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

function connectDB(){
  client.connect((err,db)=>{
    if(err) throw err;

    console.log("Connected successfully to MongoDB server");

    database = db;
  })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  run().catch(console.dir);
  // connectDB();
})

