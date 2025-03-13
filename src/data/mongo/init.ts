import mongoose from 'mongoose'

interface ConnectionOptions {
    mongoUrl: string
    databaseName: string
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions) {
        const {mongoUrl, databaseName} = options

        try {
            await mongoose.connect(mongoUrl, {
                dbName: databaseName,
            })

            return true
        } catch (error) {
            throw error
        }
    }
}