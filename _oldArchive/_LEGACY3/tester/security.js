const crypto = require('crypto');

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

function base64decrypt(need_validate_password, origin_password, salt, callback){
    crypto.scrypt(need_validate_password, salt, 64, (err, derivedKey) => {
        if (err) throw err;
        
        const hashVar = derivedKey.toString('hex');
        
        console.log(`DB에 저장되어 있는 PASSWORD : ${origin_password}`)
        console.log(`사용자로부터 입력 받은 PASSWORD : ${hashVar}`)
        
        callback(origin_password === hashVar)

    })
}
    
module.exports.base64encrypt = base64encrypt;
module.exports.base64decrypt = base64decrypt;