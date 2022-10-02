import express from "express";
import { body } from "express-validator";

import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddlewares from "./middlewares/users.middlewares";
import BodyValidationMiddleware from "./middlewares/body.validation.middleware";
import jwtMiddleware from "../auth/middlewares/jwt.middleware";
import commonPermissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";

export class UserRoutes extends CommonRoutesConfig{
    constructor(app:express.Application){
        super(app, 'UserRoutes', 'api/v1');
    }

    configureRoutes(): express.Application {

        this.app
            .route(`${this.path}/users`)
            .get(
                jwtMiddleware.validJWTNeeded,
                commonPermissionMiddleware.permissionFlagRequired(
                    PermissionFlag.ADMIN_PERMISSION,
                ),
                UsersController.listUsers
            );

        
        
        this.app.param(`${this.path}/userId`, UsersMiddlewares.extractUserId);

        this.app
            .route(`${this.path}/users/:userId`)
            .all(
                UsersMiddlewares.validateUserExists,
                jwtMiddleware.validJWTNeeded,
                commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`${this.path}/users/:userId`, [
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

        this.app.patch(`${this.path}/users/:userId`, [
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


