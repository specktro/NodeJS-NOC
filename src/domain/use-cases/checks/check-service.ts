import {LogRepository} from "../../repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../entities/log.entity";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback) {}

    public async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url)
            if (!request.ok) {
                throw new Error(`Failed to fetch request ${url}`)
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
            await this.logRepository.saveLog(log)
            this.successCallback()
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high)
            await this.logRepository.saveLog(log)
            console.log(error)
            return false
        }
    }
}