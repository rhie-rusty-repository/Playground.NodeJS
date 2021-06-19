var crypto = require('crypto');

function createSchema(mongoose) {

    /*** Create Schema ***/
    const UserSchema = new mongoose.Schema({
        username: String, // String is shorthand for {type: String}
        hashed_password: String,
        name: String,
        salt: String,
        reg_date: { type: Date, default: Date.now },
    },
        { collection: 'member' });

    UserSchema.method('encryptPassword', function (plainText, inSalt) {
        console.log("encryptPassword 호출됨");
        if (inSalt) {
            console.log(`inSalt : true : ${crypto.createHmac('sha256', inSalt).update(plainText).digest('hex')}`);
            return crypto.createHmac('sha256', inSalt).update(plainText).digest('hex');
        } else {
            console.log(`inSalt : false : ${crypto.createHmac('sha256', this.salt).update(plainText).digest('hex')}`);
            return crypto.createHmac('sha256', this.salt).update(plainText).digest('hex');
        }
    });

    // UserSchema.method('makePassword', function (plainText) {
    //     console.log("makePassword 호출됨");
    //     const inSalt = this.makeSalt();
    //     console.log(`만들어진 salt : ${inSalt}`);
    //     console.log(`암호 해싱 결과 : ${crypto.createHmac('sha256', inSalt).update(plainText).digest('hex')}`)
    //     return crypto.createHmac('sha256', inSalt).update(plainText).digest('hex');
    // });

    UserSchema.method('makeSalt', function () {
        console.log("makeSalt 호출됨");
        this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
        console.log(`salt값 설정됨 ${this.salt}`)
    });

    UserSchema.method('authenticate', function (plainText, inSalt, hashed_password) {
        console.log('authenticate 호출됨 %s -> %s : %s', plainText, this.encryptPassword(plainText, inSalt), hashed_password);
        return this.encryptPassword(plainText) == hashed_password;
    });

    UserSchema.path('username').validate(function (name) {
        return name.length;
    }, 'username 컬럼이 없습니다.');

    UserSchema.path('hashed_password').validate(function (hashed_password) {
        return hashed_password.length;
    }, 'hashed_password 칼럼의 값이 없습니다.');

    UserSchema.path('name').validate(function (email) {
        return email.length;
    }, 'name 칼럼의 값이 없습니다.');

    UserSchema.path('salt').validate(function (email) {
        return email.length;
    }, 'salt 칼럼의 값이 없습니다.');

    UserSchema.path('reg_date').validate(function (email) {
        return email.length;
    }, 'reg_date 칼럼의 값이 없습니다.');

    UserSchema.static('findByUsername', function (username, callback) {
        return this.find({
            'username': username
        }, callback);
    });

    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });

    return UserSchema;
}

module.exports.createSchema = createSchema;