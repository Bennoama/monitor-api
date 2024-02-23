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

    if (undefined == data['TransactionNumber']) {
        res.statusCode = 400;
        res.send("No transaction number submitted");
        return NaN;
    }

    const transactionNumber:number = parseInt(data['TransactionNumber']);
    if (isNaN(transactionNumber)) {
        res.statusCode = 400;
        res.send("Invalid transaction number");
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

        return await createNewEntry(amount, data['TransactionNumber'], data['Description'], data['Date']);
    });

    application.put('/', async (req:FastifyRequest, res:FastifyReply) => {
        const data:any = req.body;
        const amount = parseRequest(data, res);
        if (isNaN(amount)) {
            res.statusCode = 400;
            return res;
        }

        return await createNewEntry(amount, data['TransactionNumber'], data['Description'], data['Date']);
    });

    application.get('/', async (req:FastifyRequest, res:FastifyReply) => {
        return await getAllTransactions();
    });

    application.delete('/:transactionNumber', async (req:FastifyRequest, res:FastifyReply) => {
        const params:any = req.params;
        const transactionNumber = parseInt(params['transactionNumber']);
        if (isNaN(transactionNumber)) {
            res.statusCode = 400;
            return "Transaction number invalid";
        }

        const deletedEntry = await deleteEntry(transactionNumber);
        if (null == deletedEntry) {
            res.statusCode = 404;
            return "Transaction not found";
        }

        return deletedEntry;
    });
}