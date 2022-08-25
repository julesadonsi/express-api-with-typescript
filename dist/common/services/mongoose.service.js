"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlPArser: true,
            useUnifiedTopology: true,
            retryWrites: true,
        };
        this.connectWithRetry = () => {
            log("Attempting MongoDB connection (will retry if need)");
            mongoose_1.default
                .connect('mongodb://localhost:27017/expressapp', this.mongooseOptions)
                .then(() => { log('MongoDB is connected'); })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${retrySeconds} seconds`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tb25nb29zZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGVBQWU7SUFTakI7UUFQUSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysb0JBQWUsR0FBRztZQUN0QixlQUFlLEVBQUMsSUFBSTtZQUNwQixrQkFBa0IsRUFBQyxJQUFJO1lBQ3ZCLFdBQVcsRUFBRSxJQUFJO1NBQ3BCLENBQUM7UUFVRixxQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDcEIsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7WUFDMUQsa0JBQVE7aUJBQ0gsT0FBTyxDQUFDLHNDQUFzQyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3BFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRSxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQztpQkFDekMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1gsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixHQUFHLENBQUMsZ0RBQWdELEVBQUUsSUFBSSxDQUFDLEtBQUssVUFBVSxZQUFZLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdkcsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDLENBQUE7UUFqQkcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLGtCQUFRLENBQUM7SUFDcEIsQ0FBQztDQWFKO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9