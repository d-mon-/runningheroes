/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */

/**
 * _is allow to check the validity of a single value
 * @namespace
 * @type {{aFiniteNumber: Function, aNumber: Function, aLongitude: Function, aLatitude: Function}}
 */
var _is = {
    /**
     * @function aFiniteNumber
     * @memberof _is
     * @param v
     * @returns {boolean}
     */
    aFiniteNumber : function aFiniteNumber(v){
       return (this.aNumber(v) && isFinite(v))
    },
    /**
     * @function aNumber
     * @memberof _is
     * @param v
     * @returns {boolean}
     */
    aNumber : function aNumber(v){
        return typeof v ==='number'&&!isNaN(v);
    },
    /**
     * @function aLongitude
     * @memberof _is
     * @param v
     * @returns {boolean}
     */
    aLongitude : function aLongitude(v){
        return this.aNumber(v)&&v<=180&&v>=-180
    },
    /**
     * @function aLatitude
     * @memberof _is
     * @param v
     * @returns {boolean}
     */
    aLatitude : function aLatitude(v){
        return this.aNumber(v)&&v<=90&&v>=-90
    }
};

module.exports = _is;

