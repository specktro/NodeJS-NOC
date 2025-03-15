import {envs} from "../../../src/config/plugins/env.plugin";

describe('env.plugin.ts tests', () => {
    test('Should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'speck.legna@gmail.com',
            MAILER_SECRET_KEY: 'qvojfuxbxkgibpzl',
            PROD: false,
            MONGO_URL: 'mongodb://specktro:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'specktro',
            MONGO_PASS: '123456789'
        })
    })

    test('Should return error if not found env', async () => {
        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('../../../src/config/plugins/env.plugin')
            expect(true).toBeFalsy()
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})