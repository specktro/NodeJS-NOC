import {LogModel, MongoDatabase} from "../../../../src/data/mongo";
import {envs} from "../../../../src/config/plugins/env.plugin";
import mongoose from "mongoose";
import {MongoLogDatasource} from "../../../../src/infrastructure/datasources/mongo-log.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe('mongo-log.datasource.ts tests', () => {
    const logDataSource = new MongoLogDatasource()
    const log = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.high,
        origin: 'mongo-log.datasource.test.ts',
    })

    beforeAll(async () => {
        await MongoDatabase.connect({
            databaseName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany()
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test('Should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')

        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith('Mongo log created: ', expect.any(String))
    })

    test('Should get logs', async () => {
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)

        const logs = await logDataSource.getLogs(LogSeverityLevel.high)
        expect(logs.length).toBe(3)
    })
})