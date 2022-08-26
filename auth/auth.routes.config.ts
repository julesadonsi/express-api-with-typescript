import express from "express";
import { body } from "express-validator";

import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./controllers/auth.controller";
import jwtMiddleware from "./middlewares/jwt.middleware";
import bodyValidationMiddleware from "../users/middlewares/body.validation.middleware";


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application {
        this.app.post(`/auth`, [
            body('email').isEmail(),
            body('password').isString(),
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT,
        ]);

        return this.app;
    }
}

