import { MongoClient } from "mongodb";

export const uri = process.env.uri;
export const client = new MongoClient(uri!);

export const connectToDB = async () => {
    await client.connect();
}

export const disconnectDB = async () => {
    await client.close();
}