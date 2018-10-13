import * as winston from 'winston'
import config from '../../configuration/main'

const loggerTransportFileConfig = {
  level: 'info',
  filename: config.logger.savePath,
  handleExceptions: true,
  
}

const loggerTransportConsoleConfig  = {
  level: 'info',
  filename: config.logger.savePath,
  handleExceptions: true,
};

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(loggerTransportConsoleConfig),
    new winston.transports.File(loggerTransportFileConfig)
  ]
});

logger.info('Server logs will be saved to: ' + config.logger.savePath);
export default logger;