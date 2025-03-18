import {EmailService, SendMailOptions} from "../../../../src/presentation/email/email.service";

describe('email.service.ts tests', () => {
    test('Should send email', async () => {
        const emailService = new EmailService()
        const options: SendMailOptions = {
            to: 'specktro@nonull.mx',
            subject: 'Test email',
            htmlBody: '<h1>This email has testing purposes</h1>'
        }

        const emailSent = await emailService.sendEmail(options)

        expect(emailSent).toBeTruthy()
    })
})