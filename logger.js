/**
 * Created by GUERIN Olivier, on 19/08/2015.
 * Twitter: @MisterRaton
 */
'use strict';
var winston = require('winston');

module.exports = function(app){
    console.log('lol');
    console.log(app);
    console.log('lol2');
    var logger;
    if (app.get('env') === 'production'){
        logger = new (winston.Logger)({
            exitOnError: false,
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    handleExceptions: true,
                    timestamp: true
                })
            ]
        });
    }else {
        logger = new (winston.Logger)({
            exitOnError: false,
            transports: [
                new (winston.transports.DailyRotateFile)({
                    filename: 'runningheroes-log.log',
                    dirname: __dirname + '/log',
                    datePattern: 'yyyy-MM-dd',
                    timestamp: true,
                    handleExceptions: true,
                    json: true
                }),
                new (winston.transports.Console)({
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
