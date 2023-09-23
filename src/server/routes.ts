import cors from '@fastify/cors'
import { FastifyReply, FastifyRequest} from 'fastify';
import { createNewEntry, deleteEntry, getAllTransactions } from '../framework/crud-db';

const parseRequest = (data:any, res:FastifyReply):number => { // returns 0 is all is well
    if (undefined == data['Amount']) {
        res.statusCode = 400;
        res.send("No amount submitted");
        return NaN;
    }

    const amount:number = parseInt(data['Amount']);
    if (isNaN(amount)) {
        res.statusCode = 400;
        res.send("Invalid amount");
        return NaN;
    }

    return amount;
}

export const setRoutes = (application:any) => {
    application.register((cors), {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"]
    });
    application.post('/', async (req:FastifyRequest, res:FastifyReply) => {
        const data:any = req.body;
        const amount = parseRequest(data, res);
        if (isNaN(amount)) {
            res.statusCode = 400;
            return res;
        }

        return await createNewEntry(amount, data['Description'], data['Date']);
    });

    application.put('/', async (req:FastifyRequest, res:FastifyReply) => {
        const data:any = req.body;
        const amount = parseRequest(data, res);
        if (isNaN(amount)) {
            res.statusCode = 400;
            return res;
        }

        return await createNewEntry(amount, data['Description'], data['Date']);
    });

    application.get('/', async (req:FastifyRequest, res:FastifyReply) => {
        return await getAllTransactions();
    });

    application.delete('/', async (req:FastifyRequest, res:FastifyReply) => {
        const data:any = req.body;
        if (undefined == data['Date']) {
            res.statusCode = 400;
            return "Transaction date not submitted";
        }

        const deletedEntry = await deleteEntry(data['Date']);
        if (null == deletedEntry) {
            res.statusCode = 404;
            return "Transaction not found";
        }

        return deletedEntry;
    });
}