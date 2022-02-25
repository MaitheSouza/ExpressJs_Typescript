import Router from 'express'
import userService from '../services/userService';
import ExceptionHandler from '../model/exceptions/ExceptionHandler';
import HttpStatus from '../model/enum/HttpStatus';
import MessageStatus from '../model/enum/MessageStatus';

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    try {
        const user = userService.getAllUsers();
        return res.status(HttpStatus.OK).json(user)
    } catch(err) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: MessageStatus.internal_server_error })
    }
})

userRoutes.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const user = userService.getUserById(id);
        return res.status(HttpStatus.OK).json(user)
    } catch(err){
        if(err instanceof Error) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: MessageStatus.internal_server_error })
        let error = err as ExceptionHandler;
        return res.status(error.status).json(error.message);
    }
})

userRoutes.post("/", (req, res) => {
    try {
        const { name, email, telephone } = req.body;
        userService.createUser(name, email, telephone);
        return res.status(HttpStatus.CREATED).json({ success: MessageStatus.user_created })
    } catch(err){
        if(err instanceof Error) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: MessageStatus.internal_server_error })
        let error = err as ExceptionHandler;
        return res.status(error.status).json(error.message);
    }
})

userRoutes.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
    const { name, email, telephone } = req.body;
        userService.updateUser(id, name, email, telephone);
        return res.status(HttpStatus.NO_CONTENT).end()
    } catch(err){
        if(err instanceof Error) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: MessageStatus.internal_server_error })
        let error = err as ExceptionHandler;
        return res.status(error.status).json(error.message);
    }
})

userRoutes.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        userService.deleteUser(id);
        return res.status(HttpStatus.NO_CONTENT).end()
    } catch(err){
        if(err instanceof Error) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: MessageStatus.internal_server_error })
        let error = err as ExceptionHandler;
        return res.status(error.status).json(error.message);
    }
})

export default userRoutes;