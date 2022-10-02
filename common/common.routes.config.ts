import express from "express";

export abstract class CommonRoutesConfig{
    app:express.Application;
    name:string;
    path: string;

    constructor(app:express.Application, name:string, path:string) {
        this.app = app;
        this.name = name;
        this.path = path
        this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    abstract configureRoutes():express.Application;
}