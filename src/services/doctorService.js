import { where } from 'sequelize';
import db from '../models/index';
let handleGetAllDoctorService = () => {


    return new Promise(async (resolve, reject) => {

        try {
            let doctor = await db.User.findAll({
                where: { roleId: 'R2' },
                order: [['id', 'DESC']],
                attributes: { exclude: ['password'] }

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
module.exports = {
    handleGetAllDoctorService
}