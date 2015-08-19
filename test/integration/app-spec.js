/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';

var application = require('../../app');
var supertest = require("supertest");
var assert = require("assert");
var mongoose = require("mongoose");
var User = mongoose.model('users');
/**
 * @todo use another db + use fixture in large project
 */
describe("GET /users/", function () {
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
    beforeEach(function (done) {
        User.remove({"email": "core@runningheroes.com"}, function (err) {
            if (err) {
                return done(err);
            }
            done();
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