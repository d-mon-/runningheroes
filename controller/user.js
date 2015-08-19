/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var _is = require("../lib/_is.js");
var mongoose = require('mongoose');
var User = mongoose.model('users');


exports.getClosestUsers = function(req, res, next) {
    var coord = [];
    coord[0] = parseFloat(req.query["lat"]);
    coord[1] = parseFloat(req.query["lng"]);
    if(_is.aLongitude(coord[0])&&_is.aLatitude(coord[1])){

        var point = { type : "Point", coordinates : coord };
        User.geoNear(point, { maxDistance : 20000, spherical : true }, function(err, results, stats) {
            console.log(results);
        });
    }else{
        //TODO: return error
        console.log(false);
    }
    res.send('respond with a resource');
};

exports.insertUser = function(req,res,next){
    //TODO: valide mongoose schema
};