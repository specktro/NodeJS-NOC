import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
import {EmailService} from "./email/email.service";

// const logRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
    public static start() {
        console.log('Server started...')

        const emailService = new EmailService()
        emailService.sendEmail({
            to: 'specktro@nonull.mx',
            subject: 'System logs',
            htmlBody: `
            <h3>Logs del sistma - NOC</h3>
            <p>Lorem ipsum velit non venuam ullamco ex eu laborum</p>
            <p>Ver logs adjuntos</p>
            `
        })
    }
}