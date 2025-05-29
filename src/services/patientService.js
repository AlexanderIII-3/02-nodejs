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
            if (
                !dataInput.email
                || !dataInput.doctorId
                || !dataInput.timeTypeSel
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
                        where: {
                            patienId: user[0].id,

                            date: dataInput.dateBooking,

                        },
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
                console.log('check data booking  ', data)

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

                    let deleteShedule = await db.Schedule.destroy({
                        where: {
                            doctorId: appointment?.doctorId,
                            date: appointment?.date,
                            timeType: appointment.timeType
                        },
                    });

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

let getHistoryPatientByEmailService = (email) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!email) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter1!"
                })
            } else {
                let data = await db.History.findAll({
                    where: {
                        patientEmail: email,

                    },
                    attributes: {
                        exclude: ["createdAt", 'updatedAt'],
                    },

                    include: [
                        {

                            model: db.User,
                            as: 'doctor',
                            attributes: ['firstName', 'lastName', 'phoneNumber'],
                            // include: {

                            //     model: db.Doctor_Infor,
                            //     attributes: {
                            //         exclude: ['id', 'doctorId', "createdAt", 'updatedAt']
                            //     },
                            //     // include: [
                            //     //     { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                            //     //     { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                            //     //     { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },


                            //     // ]
                            // }




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


                if (data && data.length > 0) {

                    data.map(item => {
                        const timestamp = item.date

                        item.date = new Date(+timestamp).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        });

                        return item;

                    })
                }
                resolve({
                    EC: 0,
                    EM: "oke",
                    DT: data
                })
            }
        } catch (error) {
            reject(error);

        }

    })

}
let postInforPatientService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.patientId) {
                return resolve({
                    EC: 1,
                    EM: "Missing required parameter1!"
                });
            }

            // Kiểm tra xem bản ghi đã tồn tại chưa
            const existingRecord = await db.Health.findOne({
                where: {
                    patientId: data.patientId,
                    date: +data.date,
                    actor: data.actor
                }
            });

            if (existingRecord) {
                // Nếu đã tồn tại thì cập nhật
                const updated = await db.Health.update(
                    {
                        height: data.height || existingRecord.height,
                        weight: data.weight || existingRecord.weight,
                        bmi: data?.bmi || existingRecord.bmi,
                        bloodGroup: data.bloodType || existingRecord.bloodGroup
                    },
                    {
                        where: {
                            id: existingRecord.id
                        }
                    }
                );

                if (updated[0] > 0) {
                    return resolve({
                        EC: 0,
                        EM: "Cập nhật thông tin thành công!"
                    });
                } else {
                    return resolve({
                        EC: 1,
                        EM: "Cập nhật thất bại!"
                    });
                }
            } else {
                // Nếu chưa tồn tại thì tạo mới
                const created = await db.Health.create({
                    patientId: data.patientId,
                    date: data.date,
                    name: data.patientName,
                    height: data.height,
                    weight: data.weight,
                    bmi: data?.bmi,
                    actor: data.actor,
                    bloodGroup: data.bloodType,
                });

                if (created) {
                    return resolve({
                        EC: 0,
                        EM: "Tạo mới thông tin thành công!"
                    });
                } else {
                    return resolve({
                        EC: 1,
                        EM: "Tạo mới thất bại!"
                    });
                }
            }
        } catch (error) {
            console.error(error);
            return reject({
                EC: -1,
                EM: "Error from Server!",
                error: error.message
            });
        }
    });
};

let getHealthPatientByIdService = (patientId) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter1!"
                })
            } else {
                let data = await db.Health.findAll({
                    where: {
                        patientId: patientId,

                    },
                    attributes: {
                        exclude: ["createdAt", 'updatedAt'],
                    },



                    raw: true,
                })
                resolve({
                    EC: 0,
                    EM: "oke",
                    DT: data
                })

            }

        } catch (error) {
            reject(error);
        }
    })
}
let getListBookingByPatientIdService = (patientId) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter1!"
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        patienId: patientId,
                        statusId: 'S2'

                    },

                    include: [
                        {
                            model: db.User,

                            as: "doctorInfo",
                            attributes: ['firstName', 'lastName', 'phoneNumber'],
                        },
                        {
                            model: db.Allcode,
                            as: 'timeBookingData',
                            attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode,
                            as: 'status',
                            attributes: ['valueVi', 'valueEn']
                        },


                    ],



                    attributes: {
                        exclude: ["createdAt", 'updatedAt'],
                    },



                    raw: false,
                    nest: true
                })
                resolve({
                    EC: 0,
                    EM: "oke",
                    DT: data
                })

            }

        } catch (error) {
            reject(error);
        }
    })
}
let cancelBookingAppointmentService = (bookingId) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!bookingId) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            } else {
                let data = await db.Booking.findOne({
                    where: {
                        id: bookingId
                    },
                    raw: false
                })
                if (data) {
                    data.statusId = 'S4'
                    await data.save()
                    resolve({
                        EC: 0,
                        EM: "Cancel appointment success!"
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
}
let getAllProvincesService = () => {

    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.Allcode.findAll({
                where: {
                    type: 'PROVINCE'
                },
                attributes: ['keyMap', 'valueEn', 'valueVi'],
                raw: true
            })
            resolve({
                EC: 0,
                EM: "oke",
                DT: data
            })



        } catch (error) {
            reject(error);
        }
    })
}

let getBasicInfoByPatientIdService = (patientId, actor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId || !actor) {
                resolve({
                    EC: 1,
                    EM: "Missing required parameter!"
                })
            } else {
                let data = await db.Health.findOne({
                    where: {
                        patientId: patientId,
                        actor: actor
                    },
                    attributes: {
                        exclude: ["createdAt", 'updatedAt'],
                    },
                    raw: true
                })
                if (data) {
                    resolve({
                        EC: 0,
                        EM: "oke",
                        DT: data
                    })
                } else {
                    resolve({
                        EC: 2,
                        EM: "No health information found for this patient."
                    })
                }
            }

        } catch (error) {
            console.error('Error in getBasicInfoByPatientIdService:', error);
            reject(error);
        }

    })
}
module.exports = {
    postBookingAppointmentService,
    getConfirmBookingService, postVerifyBookingAppointmentService,
    getHistoryPatientService, getHistoryPatientByEmailService,
    postInforPatientService, getHealthPatientByIdService,
    getListBookingByPatientIdService, cancelBookingAppointmentService,
    getAllProvincesService, getBasicInfoByPatientIdService
}