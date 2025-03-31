import { where } from 'sequelize';
import db from '../models/index';
import { raw } from 'body-parser';
let handleGetAllDoctorService = () => {


    return new Promise(async (resolve, reject) => {

        try {
            let doctor = await db.User.findAll({
                where: { roleId: 'R2' },
                order: [['id', 'DESC']],
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVI'] },
                    // { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVI'] }
                ],
                raw: true,
                nest: true

            })
            if (doctor) {

                doctor.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    return item;

                })




                resolve({
                    EC: 0,
                    EM: 'fetch doctor successfully!',
                    DT: doctor
                })
            } else {
                resolve({
                    EC: 0,
                    EM: 'not found any doctor!',
                    DT: {}
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}




let postInforDoctorSevice = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkOjb = checkRequiredFields(inputData);
            if (checkOjb.isValid === false) {
                resolve({
                    EC: 1,
                    EM: `Missing parameter: ${checkOjb.element}`
                })
            }


            else {
                //upsert markdown 
                if (inputData.action === 'CREATE') {
                    await db.MarkDown.create({
                        contentHtml: inputData.contentHtml,
                        contenMarkdown: inputData.contentMarkDown,
                        description: inputData.description,
                        doctorId: inputData.id,

                    })
                }
                else if (inputData.action === 'EDIT') {

                    let doctorMarkdown = await db.MarkDown.findOne({
                        where: { doctorId: inputData.id },
                        raw: false
                    });
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHtml = inputData.contentHtml;
                        doctorMarkdown.contenMarkdown = inputData.contentMarkDown;
                        doctorMarkdown.description = inputData.description;
                        await doctorMarkdown.save()
                    }





                }
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.id

                    },
                    raw: false

                })
                if (doctorInfor) {
                    //upadate 

                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.provinceId = inputData.selectedProvince;

                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId

                    await doctorInfor.save()

                } else {
                    // create
                    await db.Doctor_Infor.create({
                        priceId: inputData.selectedPrice,
                        paymentId: inputData.selectedPayment,
                        provinceId: inputData.selectedProvince,
                        doctorId: inputData.id,

                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId


                    })
                }
                resolve({
                    EC: 0,
                    EM: 'O Ke'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailDoctorService = (idInput) => {
    return new Promise(async (resolve, reject) => {

        try {
            let id = idInput.id;
            let users = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password'],
                },
                raw: true
            })
            if (users) {
                resolve({
                    EC: 0,
                    EM: 'O ke!',
                    data: users
                })
            } else {
                resolve({
                    EC: -1,
                    EM: 'Missing parameters!',
                    data: []
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let getDetailsDoctorByIdService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    EC: -1,
                    EM: 'Missing parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        {
                            model: db.MarkDown,
                            attributes: ['description', 'contentHtml', 'contenMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },

                            ]
                        },

                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    // var hex = new Buffer.from(bin, 'base64').toString('hex');

                    data.image = new Buffer.from(data.image, 'base64').toString('binary')

                }
                if (!data) data = {};
                resolve({
                    EC: 0,
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getMoreInforDoctorService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    EC: 1,
                    EM: 'Missing required parameter!'
                })
            }
            else {
                let res = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: doctorId

                    },



                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },

                    ],

                    raw: true,
                    nest: true





                })
                if (!res) {
                    res = {};
                }
                resolve({
                    EC: 0,
                    EM: 'O ke!',
                    data: res
                })
            }




        } catch (error) {
            reject(error)
        }

    })
};
let getListPatientForDoctorService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    EC: 1,
                    EM: 'Missing required parameter!'
                })
            }
            else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date

                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },

                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeBookingData', attributes: ['valueEn', 'valueVi'],
                        }
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    EC: 0,
                    EM: "Ô KÊ!",
                    data: data
                })
            }




        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
};
module.exports = {
    handleGetAllDoctorService, postInforDoctorSevice,
    getDetailDoctorService, getDetailsDoctorByIdService,
    getMoreInforDoctorService, getListPatientForDoctorService
}