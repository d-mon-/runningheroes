/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */

var mongoose = require('mongoose');
var codeError = require('../globalization/error.js');
var _is = require('../lib/_is.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    'email': {type: String, validate:[valideEmail,codeError.emailValidator]},
    'locations':{
        'label':{type: String,validate:[validateLabel,codeError.labelValidator]},
        'geo':{type:[Number],validate:[
                    {validator:validateLengthGeo, msg:codeError.geoLengthValidator},
                    {validator:validateValueGeo, msg:codeError.geoValueValidator}
        ]}
    }
});


//validators
function validateLengthGeo(val){
    return val.length===2||val.length===0;
}
function validateValueGeo(val){
    if(val.length===0){
        return true;
    }else if(val.length===2){
        return _is.aLongitude(val[0])&&_is.aLatitude(val[1])
    }else{
        return false;
    }
}

function valideEmail(val){
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(val);
}

function validateLabel(val){
    //TODO: check if it is a country or string within a specific length
    return true;
}

mongoose.model('users', userSchema);