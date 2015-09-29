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

//Login
exports.login = function(req,res) {
    var data = req.body;
    try {
        if (data.pass == undefined || data.pass == null) {
            res.send({"status": "error", "ecode": "e3", "emsg": "Password missing"});
            return;
        }
        encryptedPassword = config.module.passwordEncrypt(data.pass);
        if (encryptedPassword == undefined || encryptedPassword == null) {
            res.send({"status": "error", "ecode": "e4", "emsg": "Password encryption failed"});
            return;
        }
        common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_LOGIN('" + data.user + "'," +
        "'" + encryptedPassword + "')", function (error, records) {
            if (!error) {
                if (records && records[0] != undefined) {
                    res.send({"status": "success", "records": records[0]});
                }
                else {
                    res.send({"status": "error", "ecode": "e3", "emsg": "Invalid data"});
                }
            }
            else {
                res.send({"status": "error", "ecode": "e5", "emsg": "API failed"});
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
};

//Enter your query
exports.createquery = function(req,res) {
    var data = req.body;
    try {
        common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_CREATEQUERY('" + data.category + "'," +
        "'" + data.topic + "','" + data.description + "','" + data.user + "')", function (error, records) {
            if (!error) {
                res.send({"status": "success", "records": records[0]});
            }
            else {
                res.send({"status": "error", "ecode": "e5", "emsg": "API failed"});
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
};

//Get list of categories
exports.getQueries = function(req,res) {
    try {
        common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_GETQUERY()", function (error, records) {
            if (!error) {
                res.send({"status": "success", "records": records[0]});
            }
            else {
                res.send({"status": "error", "ecode": "e5", "emsg": "API failed"});
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
};

//Reply to an query
exports.queryreply = function(req,res) {
    var data = req.body;
    try {
        common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_SAVEQUERY('" + data.post + "','" + data.category + "'," +
        "'" + data.topicid + "','" + data.username + "')", function (error, records) {
            if (!error) {
                res.send({"status": "success", "records": records[0]});
            }
            else {
                res.send({"status": "error", "ecode": "e5", "emsg": "API failed"});
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
};

//Get List of posts
exports.getPosts = function(req,res){
  var id = req.params.id;
    try{
        common.dbQuery(config.module.dbConfig, "CALL forumweb.SP_GETPOSTS('" + id + "')", function (error, records) {
            if (!error) {
                res.send({"status": "success", "records": records[0]});
            }
            else {
                res.send({"status": "error", "ecode": "e5", "emsg": "API failed"});
            }
        });
    }
    catch (e){
        console.log(e.message);
    }
};