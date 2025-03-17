import {LogEntity, LogSeverityLevel} from '../../../../src/domain/entities/log.entity'
import {PostgresLogDataSource} from '../../../../src/infrastructure/datasources/postgres-log.datasource'
import {PrismaClient} from "@prisma/client";

describe('postgres-log.datasource.ts tests', () => {
    const prismaClient = new PrismaClient()
    const logDataSource = new PostgresLogDataSource()
    const log = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.high,
        origin: 'postgres-log.datasource.test.ts',
    })

    afterEach(async () => {
        await prismaClient.logModel.deleteMany({})
    })

    test('Should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log')

        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith('Postgres log created: ', expect.any(Number))
    })

    test('Should get logs', async () => {
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)

        const logs = await logDataSource.getLogs(LogSeverityLevel.high)
        expect(logs.length).toBe(4)
    })
})