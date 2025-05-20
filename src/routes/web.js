import express from 'express';
import userController from '../controller/userController'
import doctorController from '../controller/doctorController';
import specialtyController from "../controller/specialtyController";
import clinicController from '../controller/clinicController';
import patientController from '../controller/patientController'
let router = express.Router();
let initWebRoute = (app) => {
    router.get('/', (req, res) => {

        return res.send('hello world!')
    })
    router.get('/test', userController.handleRes)

    router.post('/api/v1/login', userController.handleLogin)

    //crud  user
    router.post('/api/v1/create-user', userController.handleCreateUser)
    router.get('/api/v1/user/all', userController.handleGetAllUsers)
    router.delete('/api/v1/delete', userController.handleDeleteUser)


    router.get('/api/v1/fetch/allcode', userController.handleGetAllCode)


    router.get('/api/v1/getAllDoctors', doctorController.getTopDoctorHome);


    router.post('/api/v1/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/v1/detail-user', doctorController.getDetailDoctor)
    router.get('/api/v1/get-details-doctor', doctorController.getDetailsDoctorById);
    router.get('/api/v1/get-more-infor-doctor', doctorController.getMoreInforDoctor)
    // router.get('/api/v1/get-profile-infor-doctor', doctorController.getProfileInforDoctor)


    router.post('/api/v1/specialty-save-infor', specialtyController.postSpecialtySaveInfor)
    router.get('/api/v1/fetch-specialty-infor', specialtyController.getAllSpecialty)
    router.post('/api/v1/handle-delete-specialty', specialtyController.handleDeleteSpecialty);
    router.post('/api/v1/handle-update-specialty', specialtyController.handleUpdateSpecialty)
    // router.get('/api/v1/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/v1/create-new-clinic', clinicController.handleCreateNewClinic);
    router.get('/api/v1/get-all-clinic', clinicController.getAllClinic);
    router.post('/api/v1/delete-clinic', clinicController.handleDeleteClinic);
    router.get('/api/v1/get-detail-clinic-by-id', clinicController.getDetailClinicById)
    router.post('/api/v1/update-clinic', clinicController.handleUpdateClinic)

    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/v1/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)


    router.post('/api/patient-booking-appointment', patientController.postBookingAppointment)
    router.post('/api/v1/verify-booking-appointment', patientController.postVerifyBookingAppointment)
    router.post('/api/v1/genaral-pdf', doctorController.sendingRemedy)
    router.get('/api/v1/get-history', patientController.getHistoryPatient)
    router.post('/api/v1/handle-cancel-schedule', doctorController.handleCancelBooking)

    router.get('/api/v1/get-history-patient', patientController.getHistoryPatientByEmail)
    router.post('/api/save-infor-patient', patientController.postInforPatient)

    router.get('/api/v1/get-health-patient', patientController.getHealthPatientById)
    router.get('/api/v1/get-list-booking', patientController.getListBookingByPatientId)

    router.post('/api/v1/cancel-booking', patientController.cancelBookingAppointment)
    // router.post('/api/v1/genaral-pdf', patientController.postGeneralPDF)

    // Ví dụ ở backend Node.js (Express)




    return app.use('/', router);
}
module.exports = initWebRoute;