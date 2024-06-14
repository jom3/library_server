import winston from 'winston';

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info' 
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    })
  ]
});