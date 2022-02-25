import { Router } from "express";
import HttpStatus from "../model/enum/HttpStatus";
import app from '../index'

const middleware = Router();

middleware.use((req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(HttpStatus.BAD_REQUEST).json({error: "Key authorization is fault."})
    if(authorization !== app.key) return res.status(HttpStatus.UNAUTHORIZED).json({error: "Key is not valid."})
    next();
})

export default middleware;