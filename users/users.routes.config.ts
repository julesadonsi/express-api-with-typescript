import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddlewares from "./middlewares/users.middlewares";

export class UserRoutes extends CommonRoutesConfig{
    constructor(app:express.Application){
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route('/users')
            .get(UsersController.listUsers)
            .post(
                UsersMiddlewares.validateRequiredUserBodyFields,
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
            UsersMiddlewares.validateRequiredUserBodyFields,
            UsersMiddlewares.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            UsersMiddlewares.validatePatchEmail,
            UsersController.patch,
        ]);


        return this.app;
    }
}


