const dotenv = require('dotenv');
const logger = require('./server/logger.js');

dotenv.config();

const app = require('./server/server-config');

const port = process.env.PORT || 3001;

app.listen(port);

logger.info('we are now using winston for backend logging! see all the levels:');
logger.error('');
logger.warn('');
logger.info('');
logger.verbose('');
logger.debug('');
logger.silly('😜');

logger.info(`Serving up fresh HTML on port ${port}`);