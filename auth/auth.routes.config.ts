import express from "express";
import { body } from "express-validator";

import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./controllers/auth.controller";
import authMiddleware from "./middlewares/auth.middleware";
import jwtMiddleware from "./middlewares/jwt.middleware";
import bodyValidationMiddleware from "../users/middlewares/body.validation.middleware";
import usersMiddlewares from "../users/middlewares/users.middlewares";
import usersController from "../users/controllers/users.controller";


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AuthRoutes');
    }

    configureRoutes(): express.Application {
        this.app.post(`/login`, [
            body('email').isEmail(),
            body('password').isString(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.verifyUserPassword,
            authController.createJWT,
        ]);

        this.app.route('/register')
            .post(
                body('email').isEmail(),
                body('password').isLength({min:5}).withMessage('Must include password (5+ characters'),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                usersMiddlewares.validateSameEmailDoesntExist,
                usersController.createUser,
            );


        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT,
        ]);

        return this.app;
    }
}

