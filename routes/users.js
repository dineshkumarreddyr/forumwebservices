var express = require('express');
var config = require('../helpers/config'), common = require('../helpers/common');

exports.signup = function(req,res) {
    var data = req.body;
    try {
        if (data != undefined) {
            //Encrypt password
            if (data.pass == undefined || data.pass == null) {
                res.send({"status": "error", "ecode": "e3", "emsg": "Password missing"});
                return;
            }
            encryptedPassword = config.module.passwordEncrypt(data.pass);
            if (encryptedPassword == undefined || encryptedPassword == null) {
                res.send({"status": "error", "ecode": "e4", "emsg": "Password encryption failed"});
                return;
            }
            common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_CREATEUSER('" + data.user + "'," +
            "'" + data.email + "','" + encryptedPassword + "')", function (error, records) {
                if (!error) {
                    res.send({"status": "success"});
                }
                else {
                    res.send({"status": "error"});
                }
            });
        }
    }
    catch (e) {
        console.log(e.message);
    }
};
