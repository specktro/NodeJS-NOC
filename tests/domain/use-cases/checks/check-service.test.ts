import {CheckService} from "../../../../src/domain/use-cases/checks/check-service";
import {LogEntity} from "../../../../src/domain/entities/log.entity";

describe('check-service.ts tests', () => {
    const mockRespository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()
    const checkService = new CheckService(mockRespository, successCallback, errorCallback)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Should call success callback when fetch return true', async () => {
        const status = await checkService.execute('https://google.com');

        expect(status).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRespository.saveLog).toBeCalledWith(expect.any(LogEntity))
    })

    test('Should call error callback when fetch return false', async () => {
        const status = await checkService.execute('https://2wasdflmñgoogle.com');

        expect(status).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRespository.saveLog).toBeCalledWith(expect.any(LogEntity))
    })
})