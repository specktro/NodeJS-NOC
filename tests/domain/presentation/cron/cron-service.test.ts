import {CronService} from "../../../../src/presentation/cron/cron-service";

describe('cron-service.ts tests', () => {
    const mockTick = jest.fn()

    test('Should create a job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick)

        setTimeout(() => {
            expect(mockTick).toBeCalledTimes(2)
            job.stop()
            done()
        }, 2000)
    })
})