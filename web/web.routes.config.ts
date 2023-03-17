import express from "express"

import { CommonRoutesConfig } from "../common/common.routes.config"
import WebController from "./controllers/web.controller"

export class WebRoutes extends CommonRoutesConfig {
    constructor(app:express.Application){
        super(app, 'WebRoutes', '')
    }

    configureRoutes(): express.Application {
        this.app.get('/', WebController.index)

        return this.app;
    }


    
}