import {LogEntity, LogSeverityLevel} from "../../../src/domain/entities/log.entity";

describe('log.entity.ts test', () => {
    const dataObject = {
        message: 'Test log',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('Should create a LogEntity instance', () => {
        const log = new LogEntity(dataObject)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObject.message)
        expect(log.level).toBe(dataObject.level)
        expect(log.origin).toBe(dataObject.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('Should create a LogEntity instance from JSON', () => {
        const jsonString = `{
            "message":"https://gqwraesfaewsfaer-aew-weaoogle.com is not ok. TypeError: fetch failed",
            "level":"high",
            "createdAt":"2025-03-10T22:02:25.009Z",
            "origin":"check-service.ts"
        }`

        const log = LogEntity.fromJson(jsonString)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('https://gqwraesfaewsfaer-aew-weaoogle.com is not ok. TypeError: fetch failed')
        expect(log.level).toBe(LogSeverityLevel.high)
        expect(log.origin).toBe('check-service.ts')
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('Should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObject)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataObject.message)
        expect(log.level).toBe(dataObject.level)
        expect(log.origin).toBe(dataObject.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})