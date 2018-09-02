'use strict';
const winston = require('winston');
let level = '';

if( process.env.NODE_ENV === 'production' ){
    level = 'error';
} else {
    level = 'silly';
}

const logger = winston.createLogger({
    level: level,
    format: winston.format.combine(
        winston.format.colorize({level: true}),
        winston.format.simple()
    ),
    transports: [
        // colorize the output to the console
        new (winston.transports.Console)
    ],
});

module.exports = logger;