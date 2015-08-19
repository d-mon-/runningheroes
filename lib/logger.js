/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var winston = require('winston');

/**
 * logger, whith different behavior: production (disk&console) and dev (console)
 * check {@link https://github.com/winstonjs/winston/blob/master/docs/transports.md}
 *
 * @function log
 * @param {String} environment
 * @returns {Object}
 * @todo separate files between error level
 */
module.exports = function log(environment){
    var logger;
    if (environment === 'production'){
        logger = new winston.Logger({
            exitOnError: false,
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: 'runningheroes-log',
                    dirname: __dirname + '/log',
                    datePattern: 'yyyy-MM-dd',
                    timestamp: true,
                    handleExceptions: true,
                    json: true
                }),
                new winston.transports.Console({
                    colorize: true,
                    handleExceptions: true,
                    timestamp: true
                })
            ]
        });
    } else {
        logger = new winston.Logger({
            exitOnError: false,
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    handleExceptions: true,
                    timestamp: true
                })
            ]
        });
    }
    logger.stream = {
        write: function (message) {
            logger.info(message);
        }
    };
    return logger;
};
