import fs from 'fs'
import {LogDatasource} from "../../datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-low.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFiles()
    }

    private createLogsFiles() {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '')
            }
        })
    }

    private getLogsFromFile(path: string): LogEntity[] {
        const content = fs.readFileSync(path, 'utf8')
        return content.split('\n').map(LogEntity.fromJson)
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(newLog)}\n`
        fs.appendFileSync(this.allLogsPath, logAsJSON)

        if (newLog.level === LogSeverityLevel.low) {
            return
        }

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJSON)
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath)
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }
}