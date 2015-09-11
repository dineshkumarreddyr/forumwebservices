/**
 * Created by Dinesh on 12-09-2015.
 */
var express = require('express'),
    mysql = require('mysql');

var app = express();

exports.dbQuery = function(dbConfig,query,response) {
    try {
        var forumDBPool = mysql.createPool(dbConfig);
        forumDBPool.getConnection(function(err,connection){
            if(!err){
                connection.query(query, function(err,rows){
                    connection.release();
                    response(err,rows);
                });
            }
        });
    } catch (e) {
        return e.message
    }
};
