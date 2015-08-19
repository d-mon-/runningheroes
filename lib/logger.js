/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var winston = require('winston');

module.exports = function(environment){
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
    }else {
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
        write: function(message, encoding){
            logger.info(message);
        }
    };
    return logger;
};
