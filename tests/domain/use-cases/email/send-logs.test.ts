import {SendEmailLogs} from "../../../../src/domain/use-cases/email/send-logs";
import {EmailService} from "../../../../src/presentation/email/email.service";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe('send-legs.ts tests', () => {
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Should call sendEmail and saveLog', async () => {
        const result = await sendEmailLogs.execute('specktro@nonull.mx')

        expect(result).toBeTruthy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1)
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.low,
            message: 'Log email sent',
            origin: 'send-email-logs.ts'
        })
    })

    test('Should log in case of error', async () => {
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        const result = await sendEmailLogs.execute('specktro@nonull.mx')

        expect(result).toBeFalsy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1)
        expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: LogSeverityLevel.high,
            message: 'Error: Email log was not sent',
            origin: 'send-email-logs.ts'
        })
    })
})