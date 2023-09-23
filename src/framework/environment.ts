import env from 'env-var';

export const port = env.get('port').required().asIntPositive();
export const address = env.get('address').required().asString();
export const collectionName = env.get('collName').required().asString();
export const dBName = env.get('dBName').required().asString();
