import db from "../models";
import { v4 as uuidv4 } from 'uuid';

import emailService from './emailService';

// require('dotenv').config();
let buidUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verifly-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let postBookingAppointmentService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check data input', dataInput)
            if (!dataInput.email || !dataInput.doctorId || !dataInput.timeTypeSel
                || !dataInput.patientName
                || !dataInput.addressDetail
                || !dataInput.gender
                || !dataInput.dateBooking

            ) {

                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            }
            else {
                let token = uuidv4();

                await emailService.sendSimpleEmail({
                    receiverEmail: dataInput.email,
                    patientName: dataInput.patientName,
                    time: dataInput.timeString,
                    doctorName: dataInput.doctorName,
                    redirecLink: buidUrlEmail(dataInput.doctorId, token)
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: dataInput.email
                    },
                    defaults: {
                        email: dataInput.email,
                        roleId: "R3",
                        address: dataInput.addressDetail,
                        gender: dataInput.gender,
                        firstName: dataInput.patientName,
                        phoneNumber: dataInput.phone
                    },
                    raw: true
                });
                // create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patienId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: dataInput.doctorId,
                            patienId: user[0].id,
                            date: dataInput.dateBooking,
                            timeType: dataInput.timeTypeSel,
                            reason: dataInput.reason,
                            birthOfDate: dataInput.timeStamp,
                            token: token
                        },

                    })
                }
                resolve({
                    EC: 0,
                    EM: 'Oke La!'
                })
            }
        } catch (error) {
            reject(error);

        }
    });
}
let getConfirmBookingService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {

                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            } else {
                let data = await db.Booking.findOne({
                    where: {
                        email: data.email
                    }
                })
                if (!data) {
                    resolve({

                        EC: 1,
                        EM: "Not found any schedule booking! "

                    })
                }
                resolve({

                    EC: 0,
                    EM: "O ke!",
                    data: data

                })


            }

        } catch (error) {
            reject(error);
        }
    });
};
let postVerifyBookingAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {

                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()
                    resolve({
                        EC: 0,
                        EM: "Update appointment success!"
                    })

                } else {
                    resolve({
                        EC: 2,
                        EM: "Apointment has been activated or dose not exist!"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }

    })
};
let getHistoryPatientService = (patientId) => {


    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter1!"
                })
            } else {
                let data = await db.History.findAll({
                    where: {
                        patientId: patientId,

                    },
                    attributes: {
                        exclude: ["createdAt", 'updatedAt'],
                    },

                    include: [
                        {

                            model: db.User,
                            as: 'doctor',
                            attributes: ['firstName', 'lastName', 'phoneNumber'],
                            include: {

                                model: db.Doctor_Infor,
                                attributes: {
                                    exclude: ['id', 'doctorId', "createdAt", 'updatedAt']
                                },
                                include: [
                                    { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                    { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                    { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },


                                ]
                            }




                        },
                        { model: db.Allcode, as: 'timebooking', attributes: ['valueVi'], }



                    ],

                    raw: false,
                    nest: true
                })
                if (data && data.length > 0) {
                    data.map(item => {
                        item.files = new Buffer.from(item.files, 'base64').toString('binary')
                        return item;

                    })


                }
                resolve({
                    EC: 0,
                    EM: "oke",
                    data: data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookingAppointmentService,
    getConfirmBookingService, postVerifyBookingAppointmentService,
    getHistoryPatientService
}