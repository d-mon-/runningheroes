/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */

var is = require('../../lib/is');


describe("is", function () {
    describe("aLatitude", function () {
        it("sould be between 90 and -90", function () {
            expect(is.aLatitude(91)).toBe(false);
            expect(is.aLatitude(-91)).toBe(false);
            expect(is.aLatitude(90)).toBe(true);
            expect(is.aLatitude(-90)).toBe(true);
        });
    });
    describe("aLongitude", function () {
        it("sould be between 180 and -180", function () {
            expect(is.aLongitude(181)).toBe(false);
            expect(is.aLongitude(-181)).toBe(false);
            expect(is.aLongitude(180)).toBe(true);
            expect(is.aLongitude(-180)).toBe(true);
        });
    });
    describe("aNumber", function () {
        it("sould be false for String, Array, Object, NaN, undefined and null value", function () {
            expect(is.aNumber("string")).toBe(false);
            expect(is.aNumber(NaN)).toBe(false);
            expect(is.aNumber(undefined)).toBe(false);
            expect(is.aNumber(null)).toBe(false);
            expect(is.aNumber({})).toBe(false);
            expect(is.aNumber([])).toBe(false);
        });
        it("sould be true for integer and float", function () {
            expect(is.aNumber(5)).toBe(true);
            expect(is.aNumber(5.5555)).toBe(true);
        });
    });
});