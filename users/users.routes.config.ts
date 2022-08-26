import express from "express";
import { body } from "express-validator";

import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddlewares from "./middlewares/users.middlewares";
import BodyValidationMiddleware from "./middlewares/body.validation.middleware";

export class UserRoutes extends CommonRoutesConfig{
    constructor(app:express.Application){
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route('/users')
            .get(UsersController.listUsers)
            .post(

                body('email').isEmail(),
                body('password').isLength({min:5}).withMessage('Must include password (5+ characters'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddlewares.validateSameEmailDoesntExist,
                UsersController.createUser,

            );

        
        this.app.param(`userId`, UsersMiddlewares.extractUserId);

        this.app
            .route(`/users/:userId`)
            .all(UsersMiddlewares.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({min:5})
                .withMessage('Must include password (5+ characters'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddlewares.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password')
                .isLength({min:5})
                .withMessage('Must include password (5+ characters')
                .optional(),
            body('fistName').isString().optional(),
            body('lastName').isString().optional(),
            body('permissionFlags').isInt().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,

            UsersMiddlewares.validatePatchEmail,
            UsersController.patch,
        ]);


        return this.app;
    }
}


