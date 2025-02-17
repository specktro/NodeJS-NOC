interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
    constructor(private readonly successCallback: SuccessCallback, private readonly errorCallback: ErrorCallback) {}

    public async execute(url: string): Promise<boolean> {
        try {
            const request = await fetch(url)
            if (!request.ok) {
                throw new Error(`Failed to fetch request ${url}`)
            }

            this.successCallback()
            console.log(`${url} is ok`)
            return true
        } catch (error) {
            this.errorCallback(`${error}`)
            console.log(error)
            return false
        }
    }
}