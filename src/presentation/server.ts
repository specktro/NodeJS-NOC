// import {LogRepositoryImpl} from "../infrastructure/repositories/log.repository.impl";
// import {PostgresLogDataSource} from "../infrastructure/datasources/postgres-log.datasource";
// import {CronService} from "./cron/cron-service";
// import {CheckServiceMultiple} from "../domain/use-cases/checks/check-service-multiple";
// import {FileSystemDatasource} from "../infrastructure/datasources/file-system.datasource";
// import {MongoLogDatasource} from "../infrastructure/datasources/mongo-log.datasource";

// const logRepository = new LogRepositoryImpl(
//     new FileSystemDatasource()
// )
//
// const mongoRepository = new LogRepositoryImpl(
//     new MongoLogDatasource()
// )
//
// const postgresRepository = new LogRepositoryImpl(
//     new PostgresLogDataSource()
// )

export class Server {
    public static async start() {
        console.log('Server started...')

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://gqwraesfaewsfaer-aew-weaoogle.com'
        //         new CheckServiceMultiple(
        //             [logRepository, mongoRepository, postgresRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // )
    }
}