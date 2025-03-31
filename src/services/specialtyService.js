

import { raw } from "body-parser";
import db from "../models";
import { where } from "sequelize";
import { name } from "ejs";

require('dotenv').config();

let postSpecialtySaveInforService = (dataInput) => {
    return new Promise(async (resolve, reject) => {

        try {


            if (!dataInput.name
                || !dataInput.descriptionMarkDown
                || !dataInput.descriptionHtml
                || !dataInput.image
                || !dataInput.action
            ) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {
                if (dataInput.action === "CREATE") {
                    let res = await db.Specialty.create({
                        name: dataInput.name,
                        image: dataInput.image,
                        descriptionHtml: dataInput.descriptionHtml,
                        descriptionMarkDown: dataInput.descriptionMarkDown

                    })

                }
                if (dataInput.action === "EDIT") {
                    let res = await db.Specialty.findOne({
                        where: { id: dataInput.id },
                        raw: false
                    });
                    if (res) {

                        res.descriptionHtml = dataInput.descriptionHtml;
                        res.descriptionMarkDown = dataInput.descriptionMarkDown;
                        res.name = dataInput.name;
                        res.image = dataInput.image;
                        await res.save()


                    }
                }
                resolve({
                    EC: 0,
                    EM: "O ke!",


                })




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
                data: res
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
            if (!dataId || !location) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {


                let data = await db.Specialty.findOne({
                    where: { id: dataId },
                    attributes: ['descriptionHtml', 'descriptionMarkDown'],

                    raw: true,
                })
                if (data) {
                    // query twice
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: dataId },
                            attributes: ['doctorId', 'provinceId'],
                            raw: true

                        })
                    } else {
                        // find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: dataId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                            raw: true

                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
                } else data = {};





                resolve({
                    EC: 0,
                    EM: "O ke!",
                    data: data

                })


            }

        } catch (error) {
            console.log('check error from service: ', error)
            reject(error);
        }
    });
};
module.exports = {
    postSpecialtySaveInforService, getAllSpecialtyService,
    handleDeleteSpecialtyService, getDetailSpecialtyByIdService
}