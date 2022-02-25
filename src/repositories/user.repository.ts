import User from "../model/userModel";
import users from "../bd/bdUser";

const getAllUsers = () => {
    return users;
}

const getUserById = (id: number): User | undefined => {
    const user = users.filter((user) => user.getId() === id);
    return user.length === 0 ? undefined : user[0];
}

const createUser = (user: User) => {
    const lastUser = users[users.length - 1];
    user.setId(lastUser.getId() + 1);
    users.push(user);
}

const updateUser = (user: User) => {
    for(let i = 0; i < users.length; i++){
        if(users[i].getId() === user.getId()){
            users[i] = user;
            break;
        }
    }
}

const deleteUserById = (id: number) => {
    for(let i = 0; i < users.length; i++){
        if(users[i].getId() === id){
            users.splice(i, 1);
            break;
        }
    }
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUserById }