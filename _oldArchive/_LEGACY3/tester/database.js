const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const db_uri = 'mongodb://localhost:27017';
const db_name = 'local';

mongoose.connect(`${db_uri}/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*** Create Schema ***/
const UserSchema  = new Schema({
  user_id: String, // String is shorthand for {type: String}
  password: String,
  username: String,
  salt: String,
  reg_date: { type: Date, default: Date.now },
},
  { collection: 'member' })

UserSchema.path('user_id').validate(function(user_id){
  return user_id.length
}, "user_id column is not exist")

UserSchema.static('findAll',function(callback){
  return this.find({},callback);
})

/*** Create Model ***/
const UserModel = mongoose.model('Users', UserSchema );

module.exports.UserModel = UserModel;