import User from "../model/userModel";
import ExceptionHandler from "../model/exceptions/ExceptionHandler";
import HttpStatus from "../model/enum/HttpStatus";
import userRepository from "../repositories/user.repository";
import app from '../index'
import MessageStatus from "../model/enum/MessageStatus";

const getAllUsers = () => {
    return userRepository.getAllUsers();
}

const getUserById = (id: string | undefined) => {
    if(Number(id) === NaN) throw new ExceptionHandler(HttpStatus.BAD_REQUEST, { error: MessageStatus.param_id_is_not_valid })
    if(app.cache.get(`user-id-${id}`)) return app.cache.get(`user-id-${id}`)
    const user = userRepository.getUserById(Number(id));
    if(!user) throw new ExceptionHandler(HttpStatus.NOT_FOUND, { error: MessageStatus.user_not_found })
    app.cache.set(`user-id-${user.getId()}`, user, app.timeCache)
    return user;
}

const createUser = (name: string | undefined, email: string | undefined, telephone: string | undefined) => {
    if(!name || !email || !telephone) throw new ExceptionHandler(HttpStatus.BAD_REQUEST, { error: MessageStatus.fields_not_valid })
    userRepository.createUser(new User(-1, name, email, telephone))
}

const updateUser = (id: string | undefined, name: string | undefined, email: string | undefined, telephone: string | undefined) => {
    if(Number(id) === NaN) throw new ExceptionHandler(HttpStatus.BAD_REQUEST, { error: MessageStatus.param_id_is_not_valid })
    if(!name || !email || !telephone) throw new ExceptionHandler(HttpStatus.BAD_REQUEST, { error: MessageStatus.fields_not_valid })
    const user = userRepository.getUserById(Number(id));
    if(!user) createUser(name, email, telephone);
    if(user) userRepository.updateUser(new User(Number(id), name!, email!, telephone!))
    app.cache.del(`user-id-${id}`)
}

const deleteUser = (id: string | undefined) => {
    if(Number(id) === NaN) throw new ExceptionHandler(HttpStatus.BAD_REQUEST, { error: MessageStatus.param_id_is_not_valid })
    const user = userRepository.getUserById(Number(id));
    if(!user) throw new ExceptionHandler(HttpStatus.NOT_FOUND, { error: MessageStatus.user_not_found })
    userRepository.deleteUserById(Number(id));
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }