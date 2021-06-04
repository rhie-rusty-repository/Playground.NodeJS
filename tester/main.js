const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

app.use('/static', express.static(path.join(__dirname, 'public')))

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

/*** Create Schema ***/
const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean
})
const toySchema = new Schema();
toySchema.add({ name: 'string', color: 'string'}).add({price: 'number' });

/*** Create Model ***/
const Blog = mongoose.model('Blog', blogSchema);
const Toy = mongoose.model('Toy', toySchema);

app.get("/save/toys", function(req,res){
  const robot_toy = new Toy({name:"robot", color:"red",price:10000});
  robot_toy.validate((err)=>{
    if(err) throw err;
    console.log("validate status : good");
    robot_toy.save();
    console.log("database save : good");
    res.send("성공");
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

