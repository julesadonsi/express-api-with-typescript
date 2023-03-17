import express from "express";
import * as http from 'http';
import dotenv from 'dotenv';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from "cors";
import debug from "debug";
import path from "path"


import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";
import { WebRoutes } from "./web/web.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 8000;
const routes:Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const dotenvResult = dotenv.config();

app.use(express.json());
app.use(cors());

app.set('views', path.join(__dirname,'web/views'));
app.set('view engine', 'ejs');

if(dotenvResult.error){
    throw dotenvResult.error;
}
// Loggin middleware
const loggerOptions: expressWinston.LoggerOptions = {
    transports:[new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all:true})
    )
};

if (!process.env.DEBUG){
    loggerOptions.meta = false;
}

// Initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

routes.push(new UserRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new WebRoutes(app))

// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req:express.Request, res:express.Response) => {
    res.status(200).send(runningMessage);
});

server.listen(port, () => {
    routes.forEach((route:CommonRoutesConfig) =>{
        debugLog(`Routes configured for ${route.getName()}`);
        console.log(runningMessage);
    })
});
