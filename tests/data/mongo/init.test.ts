import {MongoDatabase} from "../../../src/data/mongo";
import mongoose from "mongoose";

describe('Init MongoDB', () => {
    afterAll(() => {
        mongoose.connection.close()
    })

    test('Should connect to MongoDB', async () => {
        const connected = await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            databaseName: process.env.MONGO_DB_NAME!,
        })

        expect(connected).toBeTruthy()
    })

    test('Should throw an error', async () => {
        try {
            const connected = await MongoDatabase.connect({
                mongoUrl: 'some.url',
                databaseName: process.env.MONGO_DB_NAME!,
            })
            expect(true).toBeFalsy()
        } catch (error) {
            expect(true).toBeTruthy()
        }
    })
})