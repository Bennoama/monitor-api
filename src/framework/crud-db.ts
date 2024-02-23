
import { Collection, WithId } from "mongodb";
import { client } from "../framework/mongo";
import { collectionName, dBName } from "./environment";

const getCollection = (): Collection =>  {
    return client.db(dBName).collection(collectionName!)
}

export const getAllTransactions = async () => {
    return (getCollection().find().toArray());
}

export const deleteEntry = async (transactionNumber:number) => {
    const filter = { TransactionNumber: transactionNumber };
    const collection = await getCollection();
    return (await (collection.findOneAndDelete(filter)));
}

export const createNewEntry = async (amount:number, transactionNumber:number, transactionDescription?:string , insertionDate?:Date) => {
    let date = new Date();
    let description:string = "Unspecified";

    if (undefined != transactionDescription) {
        description = transactionDescription;
    }

    if (undefined != insertionDate) {
        date = insertionDate;
    }

    const filter = { TransactionNumber: transactionNumber };
    const update = { "$set": {
                        'Amount': amount,
                        'Description': description,
                        'Date': date,
                        'TransactionNumber': transactionNumber
                        }};
                    

    const collection = await getCollection();
    return (await (collection.findOneAndUpdate(filter, update,
                {   
                    upsert: true,
                    returnDocument: "after"
                }
            )));
}
