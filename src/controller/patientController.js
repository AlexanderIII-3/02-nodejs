import { json } from "body-parser";
import patientService from "../services/patientService";
import generatePDF from '../services/generatePDF'
const path = require('path');

let postBookingAppointment = async (req, res) => {
    try {
        let data = await patientService.postBookingAppointmentService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
};
let getConfirmBooking = async (req, res) => {
    try {
        let confirm = await patientService.getConfirmBookingService(req.email)
        return res.status(200).json('o hi hi :))');
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
};
let postVerifyBookingAppointment = async (req, res) => {

    try {
        // console.log('check data from server1', req.body)
        let confirm = await patientService.postVerifyBookingAppointmentService(req.body)
        return res.status(200).json(confirm);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
};
let getHistoryPatient = async (req, res) => {


    try {
        let history = await patientService.getHistoryPatientService(req.query.patientId)
        return res.status(200).json(history);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
}

let postGeneralPDF = async (req, res) => {



    try {


        let data = await generatePDF(req.body, filePath)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }

}

let getHistoryPatientByEmail = async (req, res) => {
    try {
        let data = await patientService.getHistoryPatientByEmailService(req.query.email)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }


}
let postInforPatient = async (req, res) => {
    try {
        console.log('check data from server1', req.body)
        let data = await patientService.postInforPatientService(req.body)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
}
let getHealthPatientById = async (req, res) => {
    try {
        let data = await patientService.getHealthPatientByIdService(req.query.patientId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
}
let getListBookingByPatientId = async (req, res) => {

    try {
        let data = await patientService.getListBookingByPatientIdService(req.query.patientId)
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from Server!"
        });

    }
}
module.exports = {
    postBookingAppointment,
    getConfirmBooking, postVerifyBookingAppointment,
    getHistoryPatient, postGeneralPDF,
    getHistoryPatientByEmail, postInforPatient,
    getHealthPatientById, getListBookingByPatientId

}