import express from "express";
import argon2 from "argon2";
import debug from "debug";

import usersServices from "../services/users.services";

const log: debug.IDebugger = debug('app:users-controller');

class UserController {
    
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersServices.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user =  await usersServices.readById(req.body.id)
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res:express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersServices.create(req.body.id)
        res.status(201).send({id:userId})
    }

    async patch(req: express.Request, res: express.Response) {
        if(req.body.password){
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersServices.patchById(req.body.id, req.body))
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersServices.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersServices.deleteById(req.body.id));
        res.status(204).send()
    }
}


export default new UserController();