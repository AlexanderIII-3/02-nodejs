import { json, raw } from 'body-parser';
import db from '../models/index';
import bcrypt from "bcryptjs";
import { where } from 'sequelize';

let connectDbTest = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.User.findAll({
                raw: true
            })

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
                        attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'gender'],


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
                                EC: 1,
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
//crud user 
let handleCreateUserService = (data) => {
    return new Promise(async (resolve, reject) => {

        try {


            if (data) {

                let hashPassword = await handleHashPassword(data.password)
                let finUser = await db.User.findOne({

                    where: { email: data.email },

                })
                if (finUser) {
                    resolve({
                        EC: -1,
                        EM: 'This user has been existing in the system!',
                    })
                } else {
                    let user = await db.User.create({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: hashPassword,
                        address: data.address,
                        gender: data.gender,
                        roleId: data.role,
                        phoneNumber: data.phoneNumber,
                        positionId: data.position,
                        image: data.image

                    })
                    if (user) {
                        resolve({
                            EC: 0,
                            EM: `Create User : ${data.email} successfully! >.<`
                        })
                    } else {
                        resolve({
                            EC: -1,
                            EM: 'Error From server!'
                        })
                    }
                }



            } else {
                resolve({
                    EC: -1,
                    EM: 'KHÔNG CHUYỀN DATA À NÍ ƠI @@'
                })
            }
        } catch (error) {
            reject(error)
        }
    });
}
let handleGetAllUserService = () => {
    return new Promise(async (resolve, reject) => {

        try {
            let res = await db.User.findAll({
                raw: true,
                attributes: {
                    exclude: ['password']
                }
            });
            if (res && res.image) {


                res.map(item => {
                    if (item.image) {

                        item.image = Buffer.from(item.image, 'base64').toString('binary')
                        return item;

                    }

                })


            }
            if (res) {
                resolve({
                    EC: 0,
                    EM: "Get all user success!",
                    DT: res
                })
            }
        } catch (error) {
            reject(error)
        }
    });
};
let handleDeleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    EC: -1,
                    EM: 'Missing parameter Id',
                    res: {}
                })
            } else {
                let res = await db.User.destroy({
                    where: {
                        id: id
                    }
                });
                resolve({
                    EC: 0,
                    EM: "Delete successfully!"
                })
            }
        } catch (error) {
            reject(error)
        }

    });
};




//allcode

let handleGetAllCodeServices = (type) => {
    return new Promise(async (resolve, reject) => {

        try {
            let res = await db.Allcode.findAll({

                where: { type: type },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })


            resolve({
                EM: 'Fetch All Code Success',
                EC: 0,
                DT: res
            })




        } catch (error) {
            reject(error)
        }
    });
};
module.exports = {

    connectDbTest, handleLoginService,
    handleCreateUserService, handleGetAllUserService,
    handleDeleteUserService, handleGetAllCodeServices
}