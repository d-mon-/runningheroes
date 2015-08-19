/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */

var _is = {
    aFiniteNumber : function aFiniteNumber(v){
       return (this.aNumber(v) && isFinite(v))
    },
    aNumber : function aNumber(v){
        return typeof v ==='number'&&!isNaN(v);
    },
    aLongitude : function aLongitude(v){
        return this.aNumber(v)&&v<=180&&v>=-180
    },
    aLatitude : function aLatitude(v){
        return this.aNumber(v)&&v<=90&&v>=-90
    }
};

module.exports = _is;

