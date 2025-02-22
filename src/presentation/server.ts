import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";
import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
    public static start() {
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    logRepository,
                    () => console.log('Success'),
                    (error) => console.log(error)
                ).execute('https://google.com')
            }
        )
    }
}