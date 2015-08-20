/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';

//make sure we don't hit the database in production
var regex = /_test$/i;
if (!regex.test(process.env.DB_PATH)) {
    process.env.DB_PATH = process.env.DB_PATH + '_test';
}

var application = require('../../app');
var supertest = require("supertest");
var assert = require("assert");
var mongoose = require("mongoose");
var User = mongoose.model('users');
var cleaner = require('./fixture/clean.js');
var usersList = require('./fixture/users.js');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new MongoDB(process.env.DB_PATH, new Server('localhost', 27017));


/**
 * @todo use another db + use fixture in large project
 */
describe("GET /users/", function () {
    before(function (done) {
        //callback HELL -> use coroutine
        db.open(function (err, db) {
            if (err) {
                done(err);
            }
            cleaner.run(db.collection('users'), usersList, [{field: {'locations.geo': "2dsphere"}}, {
                field: {'email': 1},
                option: {unique: true}
            }], done);
        });
    });


    it("should respond with a list of users", function (done) {
        supertest(application)
            .get('/users/')
            .set('Accept', 'application/json')
            .query('lat=2.372713')
            .query('lng=48.848721')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert(res.body.length > 0);
                assert.notEqual(res.body[0].dis, undefined);
                done();
            });
    });
    it("should return an error with invalid latitude and longitude", function (done) {
        supertest(application)
            .get('/users/')
            .set('Accept', 'application/json')
            .query('lat=test')
            .query('lng=')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert(res.body.msg === "invalid coordinates");
                done();
            });
    });
});

describe("POST /users/", function () {
    before(function (done) {
        User.remove({}, function (err) {
            if (err) {
                return done(err);
            }
            User.create(usersList, function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
        });
    });

    it("should insert a new user", function (done) {
        supertest(application)
            .post('/users/')
            .send({ email: 'core@runningheroes.com', label: "france", lat: "2.372713", lng: "48.848721"})
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert(res.body.msg, 'success');
                done();
            });
    });
    it("should fail on email", function (done) {
        //invalid email, label too short, invalid coords
        supertest(application)
            .post('/users/')
            .send({ email: 'olivier', label: "fr", lat: "", lng: ""})
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert(res.body.length === 3);
                done();
            });
    });
});
