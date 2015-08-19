/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */

var _is = require('../../lib/_is');


describe("_is",function(){
    describe("aLatitude",function(){
        it("sould return false with 91 and -91", function(){
            expect(_is.aLatitude(91)).toBe(false);
            expect(_is.aLatitude(-91)).toBe(false);
        }) ;
        it("sould return true with 90 and -90",function(){
            expect(_is.aLatitude(90)).toBe(true);
            expect(_is.aLatitude(-90)).toBe(true);
        });
    });
    describe("aLogitude",function(){
        it("sould return false with 181 and -181", function(){
            expect(_is.aLatitude(181)).toBe(false);
            expect(_is.aLatitude(-181)).toBe(false);
        }) ;
        it("sould return true with 180 and -180",function(){
            expect(_is.aLatitude(180)).toBe(true);
            expect(_is.aLatitude(-180)).toBe(true);
        });
    });
    describe("aNumber",function(){
        it("sould be false for String, NaN, undefined and null value",function(){
            expect(_is.aNumber("string")).toBe(false);
            expect(_is.aNumber(NaN)).toBe(false);
            expect(_is.aNumber(undefined)).toBe(false);
            expect(_is.aNumber(null)).toBe(false);
        });
        it("sould be true for integer and float",function(){
            expect(_is.aNumber(5)).toBe(true);
            expect(_is.aNumber(5.5555)).toBe(true);
        })
    })
});