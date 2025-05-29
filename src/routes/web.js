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
    router.put('/api/v1/participant', userController.handleUpdateUser)
    router.post('/api/v1/register', userController.handleRegisterUser)
    router.get('/api/v1/verify-email', userController.handleVerifyEmail)
    router.post('/api/v1/reset-password', userController.handleResetPassword)
    router.get('/api/v1/fetch/allcode', userController.handleGetAllCode)

    // router.get('/api/v1/get-profile-infor-doctor', doctorController.getProfileInforDoctor)


    router.post('/api/v1/specialty-save-infor', specialtyController.postSpecialtySaveInfor)
    router.get('/api/v1/fetch-specialty-infor', specialtyController.getAllSpecialty)
    router.post('/api/v1/handle-delete-specialty', specialtyController.handleDeleteSpecialty);
    router.post('/api/v1/handle-update-specialty', specialtyController.handleUpdateSpecialty)
    router.get('/api/v1/get-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/v1/create-new-clinic', clinicController.handleCreateNewClinic);
    router.get('/api/v1/get-all-clinic', clinicController.getAllClinic);
    router.post('/api/v1/delete-clinic', clinicController.handleDeleteClinic);
    router.get('/api/v1/get-detail-clinic-by-id', clinicController.getDetailClinicById)
    router.post('/api/v1/update-clinic', clinicController.handleUpdateClinic)

    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/v1/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/v1/handle-cancel-schedule', doctorController.handleCancelBooking)
    router.post('/api/v1/genaral-pdf', doctorController.sendingRemedy)
    router.post('/api/v1/save-follow-up', doctorController.handleSaveFollowUp)
    router.get('/api/v1/fetch-all-rexam', doctorController.fetchAllRexam)
    router.put('/api/v1/update-follow-up', doctorController.handleUpdateFollowUp)
    router.post('/api/v1/handle-create-reexam', doctorController.handleCreateRexam)
    router.get('/api/v1/get-all-doctor-province', doctorController.getAllDoctorProvince)
    router.delete('/api/v1/delete-reexam', doctorController.handleDeleteRexam)
    router.put('/api/v1/update-reexam', doctorController.handleUpdateRexam)
    router.get('/api/v1/getAllDoctors', doctorController.getTopDoctorHome);
    router.post('/api/v1/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/v1/detail-user', doctorController.getDetailDoctor)
    router.get('/api/v1/get-details-doctor', doctorController.getDetailsDoctorById);
    router.get('/api/v1/get-more-infor-doctor', doctorController.getMoreInforDoctor)

    router.post('/api/patient-booking-appointment', patientController.postBookingAppointment)
    router.post('/api/v1/verify-booking-appointment', patientController.postVerifyBookingAppointment)
    router.get('/api/v1/get-history', patientController.getHistoryPatient)
    router.get('/api/v1/get-history-patient', patientController.getHistoryPatientByEmail)
    router.post('/api/save-infor-patient', patientController.postInforPatient)
    router.get('/api/v1/get-health-patient', patientController.getHealthPatientById)
    router.get('/api/v1/get-list-booking', patientController.getListBookingByPatientId)
    router.post('/api/v1/cancel-booking', patientController.cancelBookingAppointment)
    router.get('/api/v1/get-all-province', patientController.getAllProvinces)
    router.get('/api/v1/get-basic-info-by-patient-id', patientController.getBasicInfoByPatientId)

    // router.post('/api/v1/genaral-pdf', patientController.postGeneralPDF)





    return app.use('/', router);
}
module.exports = initWebRoute;