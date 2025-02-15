import {CronJob} from 'cron'

export class Server {
    public static start() {
        console.log('Server started...')

        const job = new CronJob(
            '* * * * * *',
            () => {
                console.log('You will see this message every second')
            }
        );

        job.start()
    }
}