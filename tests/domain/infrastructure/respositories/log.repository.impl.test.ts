import {LogRepositoryImpl} from "../../../../src/infrastructure/repositories/log.repository.impl";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe('log.repository.impl.ts tests', () => {
    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const logRepository = new LogRepositoryImpl(mockLogDataSource)

    beforeAll(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call the datasource with arguments', async () => {
        const log = {
            level: LogSeverityLevel.high,
            message: 'test message',
            origin: 'log.repository.impl.test.ts'
        } as LogEntity

        await logRepository.saveLog(log)

        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log)
    })

    test('getLogs should call the datasource with arguments', async () => {
        await logRepository.getLogs(LogSeverityLevel.high)

        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.high)
    })
})