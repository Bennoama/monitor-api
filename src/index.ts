import { fastify } from 'fastify';
import { setUpServer } from './server/index';
import * as mongo from './framework/mongo';
import { logger } from './framework/logger';

const application = fastify({
    logger
});
// Server Configuration

const main = async () => {
    logger.info("Connectiong to db...");
    await mongo.connectToDB();
    setUpServer(application);
};

main()
    .catch(console.error);