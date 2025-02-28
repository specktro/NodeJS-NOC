import nodemailer from 'nodemailer'
import {envs} from "../../config/plugins/env.plugin";
import {LogRepository} from "../../domain/repository/log.repository";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";

interface SendMailOptions {
    to: string|string[]
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(private readonly logRepository: LogRepository) {

    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const {to, subject, htmlBody, attachments = []} = options
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
            await this.logRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email did not send',
                origin: 'email.service.ts'
            })
            await this.logRepository.saveLog(log)
            return false
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor'
        const htmlBody = `
            <h3>Logs del sistma - NOC</h3>
            <p>Lorem ipsum velit non venuam ullamco ex eu laborum</p>
            <p>Ver logs adjuntos</p>
            `
        const attachments: Attachment[] = [
            {filename: 'logs-low.log', path: './logs/logs-low.log',},
            {filename: 'logs-high.log', path: './logs/logs-high.log',},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log',},
        ]
        this.sendEmail({to, subject, htmlBody, attachments})
    }
}