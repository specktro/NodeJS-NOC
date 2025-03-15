import {LogDatasource} from "../../../src/domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../../src/domain/entities/log.entity";

describe('log.datasource.ts tests', () => {
    const testLog  = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.high
    })

    class MockLogDatasouce implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [testLog]
        }

    }

    test('Should test the abstract class', async () => {
        const mockLogDatasource = new MockLogDatasouce()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasouce)
        expect(typeof  mockLogDatasource.saveLog).toBe('function')
        expect(typeof  mockLogDatasource.getLogs).toBe('function')

        await mockLogDatasource.saveLog(testLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)
    })
})