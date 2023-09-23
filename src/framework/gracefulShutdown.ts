import * as mongo from './mongo';

export const gracefulShutdown = (server:any) => {
    const atExitHandler = () => {
        server.close();
        mongo.disconnectDB();
    };
    
    process.once('SIGINT', atExitHandler);
    process.once('SIGTERM', atExitHandler);
};
