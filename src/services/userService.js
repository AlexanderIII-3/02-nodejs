import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from "bcryptjs";
import { where } from 'sequelize';

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
//hash password
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
//check email

let handleCheckEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true);

            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }

    });

};
let handleLoginService = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (email) {

                let isExist = await handleCheckEmail(email)
                //user already exist

                if (isExist) {
                    let user = await db.User.findOne({
                        where: { email: email },
                        raw: true,
                        attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],


                    }

                    )
                    if (user) {
                        //compare password
                        // password === user.password ? true : false;
                        let check = await bcrypt.compareSync(password, user.password);

                        delete user.password

                        if (check) {
                            resolve({
                                DT: user,
                                EC: 0,
                                EM: 'Login successful!'

                            })
                        } else {
                            resolve({
                                DT: {},
                                EC: 0,
                                EM: 'Wrong password!'

                            })
                        }
                    } else {
                        resolve({
                            EC: -1,
                            EM: "Your email isn't exist in system, pls try ohter email!"
                        })
                    }


                } else {
                    resolve({
                        EC: -1,
                        EM: "Your email isn't exist in system, pls try ohter email!"
                    })
                }
            } else {
                resolve({
                    EC: -1,
                    EM: "Missing parameter Email!"
                })
            }


        } catch (error) {
            reject(error)

        }

    });
};
let compareUserPassword = (password) => {
    return new Promise((resolve, reject) => {

        try {

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {

    connectDbTest, handleLoginService
}