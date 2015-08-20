/**
 * Created by GUERIN Olivier, on 20/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
/**
 * @namespace
 * @type {{run: Function, dropCollection: Function, insertFixture: Function, createIndexex: Function}}
 */
module.exports = {
    /**
     * run all functions to clean, insert and add indexes to database
     * @exemple cleaner.run(db.collection('users'), usersList, [{field: {'locations.geo': "2dsphere"}}, {
                field: {'email': 1},
                option: {unique: true}
            }], done);
     * @function
     * @param collection
     * @param fixture
     * @param indexes
     * @param cb
     * @todo coroutine
     */
    run: function run(collection, fixture, indexes, cb) {
        var self = this;
        self.dropCollection(collection, cb, function () {
            if (Array.isArray(fixture) && fixture.length > 0) {
                self.insertFixture(collection, fixture, cb, function () {
                    if (Array.isArray(indexes) && indexes.length > 0) {
                        self.createIndexes(collection, indexes, cb);
                    } else {
                        cb();
                    }
                });
            } else {
                cb();
            }
        });
    },

    /**
     * @function
     * @param collection
     * @param cb
     * @param cb2
     */
    dropCollection: function dropCollection(collection, cb, cb2) {
        collection.drop(function (err) {
            if (err) {
                cb(err);
            } else {
                cb2();
            }
        });
    },
    /**
     * @function
     * @param collection
     * @param fixture
     * @param cb
     * @param cb2
     */
    insertFixture: function insertFixture(collection, fixture, cb, cb2) {
        collection.insert(fixture, function (err) {
            if (err) {
                cb(err);
            } else {
                cb2();
            }
        });
    },
    /**
     * @function
     * @param collection
     * @param indexes
     * @param cb
     */
    createIndexes: function createIndexes(collection, indexes, cb) {
        var index = indexes.pop(),
            fields = index.field,
            option = index.option || {};
        collection.createIndex(fields, option, function (err) {
            if (err) {
                cb(err);
            } else if (indexes.length !== 0) {
                createIndexes(collection, indexes, cb);
            } else {
                cb();
            }
        });
    }
};