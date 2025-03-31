import express from 'express';
import userController from '../controller/userController'
import doctorController from '../controller/doctorController';
import specialtyController from "../controller/specialtyController";
import clinicController from '../controller/clinicController';
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
    router.get('/api/v1/getAllDoctors', doctorController.handleGetAllDoctor);


    router.post('/api/v1/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/v1/detail-user', doctorController.getDetailDoctor)
    router.get('/api/v1/get-details-doctor', doctorController.getDetailsDoctorById);
    router.get('/api/v1/get-more-infor-doctor', doctorController.getMoreInforDoctor)
    router.get('/api/v1/get-profile-infor-doctor', doctorController.getProfileInforDoctor)


    router.post('/api/v1/specialty-save-infor', specialtyController.postSpecialtySaveInfor)
    router.get('/api/v1/fetch-specialty-infor', specialtyController.getAllSpecialty)
    router.post('/api/v1/handle-delete-specialty', specialtyController.handleDeleteSpecialty);
    router.get('/api/v1/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/v1/create-new-clinic', clinicController.handleCreateNewClinic);
    router.get('/api/v1/get-all-clinic', clinicController.getAllClinic);
    router.post('/api/v1/delete-clinic', clinicController.handleDeleteClinic);
    router.get('/api/v1/get-detail-clinic-by-id', clinicController.getDetailClinicById)
    return app.use('/', router);
}
module.exports = initWebRoute;
