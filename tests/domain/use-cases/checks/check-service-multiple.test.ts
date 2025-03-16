import {CheckServiceMultiple} from "../../../../src/domain/use-cases/checks/check-service-multiple";
import {LogEntity} from "../../../../src/domain/entities/log.entity";

describe('check-service-multiple.ts tests', () => {
    const mockRespositoryOne = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRespositoryTwo = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn()
    const errorCallback = jest.fn()
    const checkService = new CheckServiceMultiple([mockRespositoryOne, mockRespositoryTwo], successCallback, errorCallback)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Should call success callback when fetch return true', async () => {
        const status = await checkService.execute('https://google.com');

        expect(status).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()
        expect(mockRespositoryOne.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockRespositoryTwo.saveLog).toBeCalledWith(expect.any(LogEntity))
    })

    test('Should call error callback when fetch return false', async () => {
        const status = await checkService.execute('https://2wasdflasda--mñgoogle.com');

        expect(status).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()
        expect(mockRespositoryOne.saveLog).toBeCalledWith(expect.any(LogEntity))
        expect(mockRespositoryTwo.saveLog).toBeCalledWith(expect.any(LogEntity))
    })
})