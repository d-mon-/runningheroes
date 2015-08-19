/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var is = require("../lib/is");
var mongoose = require('mongoose');
var User = mongoose.model('users');
var logger = require('../lib/logger')(process.env.NODE_ENV || 'development');

/**
 * retrieve users within 20km from a tuple of longitude and latitude
 * in <users> collection
 * @param req
 * @param res
 * @TODO : use coroutine: {@link https://github.com/tj/co}
 */
exports.getClosestUsers = function (req, res) {
    var coord = [], point;
    coord[0] = parseFloat(req.query.lat);
    coord[1] = parseFloat(req.query.lng);
    if (is.aLongitude(coord[0]) && is.aLatitude(coord[1])) {
        point = { type : "Point", coordinates : coord };
        User.geoNear(point, { maxDistance : 20000, spherical : true }, function (err, results) {
            if (err) {
                logger.info(err);
                res.send({error: true, code: 10, msg: "a problem has occured on the database"});
            } else {
                if (results.length > 0) {
                    res.send(results);
                } else {
                    res.send({msg: "users not found"});
                }
            }
        });
    } else {
        res.send({msg: "invalid coordinates"});
    }
};

/**
 * Insert a single user in <users> collection
 * @param req
 * @param res
 * @param next
 * @todo  use coroutine: {@link https://github.com/tj/co}
 */
exports.insertUser = function (req, res) {
    var user = new User();
    user.email = req.body.email;
    user.locations.label = req.body.label;
    user.locations.geo[0] = parseFloat(req.body.lng);
    user.locations.geo[1] = parseFloat(req.body.lat);
    user.save(function (err) {
        var errName, message;
        if (err) {
            if (err.code === 11000) {
                res.send({msg: "duplicate emails, choose another one"});
            } else if (err.hasOwnProperty('errors')) {
                message = [];
                for (errName in err.errors) {
                    if (err.errors.hasOwnProperty(errName)) {
                        message.push(err.errors[errName].properties.message);
                    }
                }
                res.send(message);
            } else {
                logger.error(err);
                res.send({error: true, code: 10, msg: "a problem has occured on the database"});
            }
        } else {
            res.send({msg: "success"});
        }
    });
};