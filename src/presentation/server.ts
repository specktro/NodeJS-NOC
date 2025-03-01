import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {EmailService} from "./email/email.service";
import {SendEmailLogs} from "../domain/use-cases/email/send-logs";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService()

export class Server {
    public static start() {
        console.log('Server started...')
        new SendEmailLogs(emailService, logRepository).execute(['specktro@nonull.mx', 'miguelangel.gomezrivero@gmail.com'])
    }
}