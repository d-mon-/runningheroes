/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var mongoose = require('mongoose');
var is = require('../lib/is');
var Schema = mongoose.Schema;

/**
 * Verify if both coordinates are valid
 * @param {number[]} value
 * @returns {boolean}
 */
function validateGeoValue(val) {
    if (val.length === 2) {
        return is.aLongitude(val[0]) && is.aLatitude(val[1]);
    }
    if (val.length === 0) {
        return true;
    }
    return false;
}

/**
 * verify if value is a valid email
 * @param {string} val
 * @returns {boolean}
 */
function validateEmail(val) {
    var regex = /^([\w-]{2,73}(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(val);
}

/**
 * verify if label is a valid country
 * @param {string} val
 * @returns {boolean}
 * @todo hit a database or set of country to verify the validity
 */
function validateLabel(val) {
    return (val.length < 30 && val.length > 2);
}

/**
 * @constructor
 */
var userSchema = new Schema({
    'email': {type: String, validate: [validateEmail, "email invalid"]},
    'locations': {
        'label': {type: String, validate: [validateLabel, "label invalid"]},
        'geo': {type: [Number], validate: [validateGeoValue, "invalid coordinates"]}
    }
}, { autoIndex: false});



mongoose.model('users', userSchema);