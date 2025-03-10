import {LogRepository} from "../../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback) {}

    private callLogs(log: LogEntity) {
        this.logRepository.forEach((logRepository) => {
            logRepository.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url)
            if (!request.ok) {
                throw new Error(`Failed to fetch request ${url}`)
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts',
            })
            this.callLogs(log)
            this.successCallback()
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            })
            this.callLogs(log)
            console.log(error)
            return false
        }
    }
}