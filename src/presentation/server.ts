import {CronService} from "./cron/cron-service";
import {CheckService} from "../domain/use-cases/checks/check-service";

export class Server {
    public static start() {
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    () => console.log('Success'),
                    (error) => console.log(error)
                ).execute('https://google.com')
            }
        )
    }
}