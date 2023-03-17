import express from "express"
import argon2 from "argon2"
import debug from "debug"

const log: debug.IDebugger = debug('app:web-controller');

class WebController {

    async index(req:express.Request, res:express.Response) 
    {
        res.render('index')
    }
}

export default new WebController()