import fs from 'fs'
import path from 'path'
import {FileSystemDatasource} from "../../../../src/infrastructure/datasources/file-system.datasource";
import {LogEntity, LogSeverityLevel} from "../../../../src/domain/entities/log.entity";

describe('file-system.datasource.ts tests', () => {
    const logPath = path.join(__dirname, '../../../../logs')

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test('Should create log files if they do not exist', () => {
        new FileSystemDatasource()

        const files = fs.readdirSync(logPath)

        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
    })

    test('Should save a log in logs-low.log', async () => {
        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })
        await logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
    })

    test('Should save a log in logs-medium.log', async () => {
        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })
        await logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
        expect(mediumLogs).toContain(JSON.stringify(log))
    })

    test('Should save a log in logs-high.log', async () => {
        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'Test message',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })
        await logDataSource.saveLog(log)
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    })

    test('Should return all logs', async () => {
        const logDataSource = new FileSystemDatasource()
        const logLow = new LogEntity({
            message: 'Test message low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })
        const logMedium = new LogEntity({
            message: 'Test message medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })
        const logHigh = new LogEntity({
            message: 'Test message high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })
        await logDataSource.saveLog(logLow)
        await logDataSource.saveLog(logMedium)
        await logDataSource.saveLog(logHigh)

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
    })

    test('Should return an error if severity level is not defined', async () => {
        const logDataSource = new FileSystemDatasource()
        const customSeverity = 'INSANE_LOG_LEVEL' as LogSeverityLevel

        try {
            await logDataSource.getLogs(customSeverity)
            expect(true).toBeFalsy()
        } catch (error) {
            const errorString = `${error}`
            expect(errorString).toContain(`${customSeverity} not implemented`)
        }
    })
})