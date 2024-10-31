// src/config/logger.js
const winston = require('winston');
const path = require('path');

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(logColors);

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const logger = winston.createLogger({
    levels: logLevels,
    format: logFormat,
    transports: [
        // Error logs
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
        }),
        // All logs
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/combined.log'),
        }),
    ],
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

// Create a stream object for Morgan HTTP logger
logger.stream = {
    write: (message) => logger.http(message.trim()),
};

module.exports = logger;

