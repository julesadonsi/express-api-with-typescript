import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {

    private count = 0;
    private mongooseOptions = {
        useNewUrlPArser:true,
        useUnifiedTopology:true,
        retryWrites: true,
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log("Attempting MongoDB connection (will retry if need)");
        mongoose
            .connect('mongodb://localhost:27017/expressapp',this.mongooseOptions)
            .then(() => {log('MongoDB is connected')})
            .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds`, err);
                setTimeout(this.connectWithRetry, retrySeconds*1000);
            })
    }
}

export default new MongooseService();