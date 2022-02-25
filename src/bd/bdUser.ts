import * as fake from '@ngneat/falso'
import User from '../model/userModel';

const randUsers = (): Array<User> => {
    let users: Array<User>  = []
    for(let i = 0; i < 900; i++) {
        users.push(new User(i + 1, fake.randFullName(), fake.randEmail(), fake.randPhoneNumber()))
    }
    return users;
}

const users: Array<User> = new Array(...randUsers());

export default users;