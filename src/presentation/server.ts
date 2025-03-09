import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {EmailService} from "./email/email.service";
// import {SendEmailLogs} from "../domain/use-cases/email/send-logs";
import {MongoLogDatasource} from "../infrastructure/datasources/mongo-log.datasource";
import {LogSeverityLevel} from "../domain/entities/log.entity";

const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
)
const emailService = new EmailService()

export class Server {
    public static async start() {
        console.log('Server started...')

        const logs = await logRepository.getLogs(LogSeverityLevel.low)
        console.log(logs)
        // new SendEmailLogs(emailService, logRepository).execute(['specktro@nonull.mx', 'miguelangel.gomezrivero@gmail.com'])
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )
    }
}