import {LogModel, MongoDatabase} from "../../../../src/data/mongo";
import {envs} from "../../../../src/config/plugins/env.plugin";
import mongoose from "mongoose";

describe('log.model.test.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            databaseName: envs.MONGO_DB_NAME
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test('Should return log model', async () => {
        const logData = {
            origin: 'log.mode.test.ts',
            message: 'test message',
            level: 'low'
        }

        const log = await LogModel.create(logData)

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }))

        await LogModel.findByIdAndDelete(log.id)
    })

    test('Should return object schema', async () => {
        const schema = LogModel.schema.obj

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: expect.any(Function),
            level: {
                type: expect.any(Function),
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },
            createdAt: expect.any(Object),
        }))
    })
})