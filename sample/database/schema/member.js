const crypto = require('crypto');

module.exports = {
    name : 'member',
    schema : {
        username : {type : String, unique : true},
        hashed_password : String,
        name : String,
        salt : String,
        reg_date : { type : Date, default : Date.now }
    },
    method : [
        makeSalt,
        encryptPasswordString,
        makeEncryptedPassword,
        authenticate
    ],
    // static : [], if there are static functions
}


function makeSalt(){
    this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
}

function encryptPasswordString(plainText){
    return crypto.createHmac('sha256', this.salt).update(plainText).digest('hex');
}

function makeEncryptedPassword(plainText){
    this.makeSalt();
    this.hashed_password = this.encryptPasswordString(plainText);
}

function authenticate(plainText){
    return this.hashed_password === this.encryptPasswordString(plainText);
}