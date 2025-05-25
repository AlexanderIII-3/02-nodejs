

import { raw } from "body-parser";
import db from "../models";
import { where } from "sequelize";
import { name } from "ejs";

// require('dotenv').config();

let postSpecialtySaveInforService = (dataInput) => {
    return new Promise(async (resolve, reject) => {

        try {


            if (!dataInput.name
                || !dataInput.descriptionMarkDown
                || !dataInput.descriptionHtml
                || !dataInput.image

            ) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {
                let findExist = await db.Specialty.findOne({
                    where: { name: dataInput.name }
                })
                if (findExist) {
                    resolve({
                        EC: 1,
                        EM: "This Specilaty current is exist in the system!",


                    })
                } else {
                    let res = await db.Specialty.create({
                        name: dataInput.name,
                        image: dataInput.image,
                        descriptionHtml: dataInput.descriptionHtml,
                        descriptionMarkDown: dataInput.descriptionMarkDown

                    })
                    resolve({
                        EC: 0,
                        EM: "Create specialty success!",


                    })
                }



                // if (dataInput.action === "EDIT") {
                //     let res = await db.Specialty.findOne({
                //         where: { id: dataInput.id },
                //         raw: false
                //     });
                //     if (res) {

                //         res.descriptionHtml = dataInput.descriptionHtml;
                //         res.descriptionMarkDown = dataInput.descriptionMarkDown;
                //         res.name = dataInput.name;
                //         res.image = dataInput.image;
                //         await res.save()


                //     }
                // }





            }





        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
};
let getAllSpecialtyService = () => {
    return new Promise(async (resolve, reject) => {

        try {

            let res = await db.Specialty.findAll({
            }
            );


            if (res && res.length > 0) {
                res.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    return item;

                })


            }
            resolve({
                EC: 0,
                EM: "O ke!",
                DT: res
            })
        } catch (error) {
            reject(error);
        }
    });


}
let handleDeleteSpecialtyService = (id) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!id) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }

            await db.Specialty.destroy({
                where: {
                    id: id
                }
            }
            );



            resolve({
                EC: 0,
                EM: "O ke!",

            })
        } catch (error) {
            reject(error);
        }
    });

};
let getDetailSpecialtyByIdService = (dataId, location) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!dataId) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {


                let data = await db.Specialty.findOne({
                    where: { id: dataId },
                    attributes: ['name', 'descriptionHtml', 'descriptionMarkDown'],

                    raw: true,
                })


                if (!data) {
                    resolve({
                        EC: 1,
                        EM: "Specialty not found!"
                    })
                    return;

                }


                resolve({
                    EC: 0,
                    EM: "O ke!",
                    DT: data

                })


            }

        } catch (error) {
            console.log('check error from service: ', error)
            reject(error);
        }
    });
};
let handleUpdateSpecialtyService = (data) => {

    return new Promise(async (resolve, reject) => {

        try {
            if (!data.id || !data.image) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {


                let res = await db.Specialty.findOne({
                    where: { id: data.id }



                })
                if (res) {
                    res.name = data.name;

                    res.image = data.image;
                    res.descriptionHtml = data.descriptionHtml
                    res.descriptionMarkDown = data.descriptionMarkDown

                    await res.save()

                }
                resolve({
                    EC: 0,
                    EM: "Update success!"
                })



            }
        } catch (error) {
            console.log('check error from service: ', error)
            reject(error);
        }




    });
}
module.exports = {
    postSpecialtySaveInforService, getAllSpecialtyService,
    handleDeleteSpecialtyService, getDetailSpecialtyByIdService,
    handleUpdateSpecialtyService
}