import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {EmailService} from "./email/email.service";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
    public static start() {
        console.log('Server started...')

        const emailService = new EmailService()
        emailService.sendEmailWithFileSystemLogs(['specktro@nonull.mx', 'miguelangel.gomezrivero@gmail.com'])
    }
}