/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var _is = require("../lib/_is");
var mongoose = require('mongoose');
var User = mongoose.model('users');
var logger = require('../lib/logger')(process.env.NODE_ENV||'development');

/**
 * retrieve users within 20km from a tuple of longitude and latitude
 * in <users> collection
 * @param req
 * @param res
 * @TODO : use coroutine: {@link https://github.com/tj/co}
 */
exports.getClosestUsers = function(req, res) {
    var coord = [];
    coord[0] = parseFloat(req.query["lat"]);
    coord[1] = parseFloat(req.query["lng"]);
    if(_is.aLongitude(coord[0])&&_is.aLatitude(coord[1])){
        var point = { type : "Point", coordinates : coord };
        User.geoNear(point, { maxDistance : 20000, spherical : true }, function(err, results) {
            if(err){
                logger.info(err);
                res.send({error: true, code:10, msg:"a problem has occured on the database"});
            } else {
                if (results.length > 0) {
                    res.send(results);
                } else {
                    res.send({msg:"users not found"});
                }
            }
        });
    }else{
        res.send({msg:"invalid coordinates"});
    }
};

/**
 * Insert a single user in <users> collection
 * @param req
 * @param res
 * @param next
 * @todo  use coroutine: {@link https://github.com/tj/co}
 */
exports.insertUser = function(req,res,next){
    var _user = new User();
    _user.email = req.body["email"];
    _user.locations.label=req.body["label"];
    _user.locations.geo[0] = parseFloat(req.body["lng"]);
    _user.locations.geo[1] = parseFloat(req.body["lat"]);

    _user.save(function(err){
        if(err){
            if(err.code===11000){
                logger.error(err.message);
                res.send({code:11000, msg:"duplicate emails, choose another one"});
            }else{
                logger.error(err);
                res.send({error:true, code:10, msg:"a problem has occured on the database"});
            }
        }else{
            res.send({msg:"success"});
        }
        console.log('lol4');
    });
};