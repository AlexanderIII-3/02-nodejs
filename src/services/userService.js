import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from "bcryptjs";

let connectDbTest = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.User.findAll({
                raw: true
            })
            let hashPassword = await handleHashPassword('alex nguyen')
            console.log('check hash password1212', hashPassword)
            if (res) {
                resolve({
                    EC: 0,
                    EM: 'take data succsess',
                    DT: res

                })
            }
        } catch (error) {

        }

    })
}

let handleHashPassword = (password) => {
    try {
        if (password) {
            let salt = bcrypt.genSaltSync(5);
            let hash = bcrypt.hashSync(password, salt);

            return hash;
        } else {
            return;
        }
    } catch (error) {

    }

};
module.exports = {

    connectDbTest
}