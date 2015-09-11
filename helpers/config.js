/**
 * Created by Dinesh on 11-09-2015.
 */
var crypto = require('crypto');

//Declaring the algorithm and Key
var algorithm = 'aes256';
var key = '--forum#eb000098';

exports.module = {
    passwordDecrypt: function (decryptPassword) {
        var decipher = crypto.createDecipher(algorithm, key);
        return decrytPass = decipher.update(decryptPassword, 'hex', 'utf8') + decipher.final('utf8');
    },
    passwordEncrypt: function (encryptPassword) {
        var cipher = crypto.createCipher(algorithm, key);
        return encryptPass = cipher.update(encryptPassword, 'utf8', 'hex') + cipher.final('hex');
    },
    dbConfig: {
        host: 'localhost',
        user: 'root',
        password: '1234'
    }
};
