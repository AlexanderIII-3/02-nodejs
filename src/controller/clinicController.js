import { json } from "body-parser";
import clinicService from "../services/clinicService";
let handleCreateNewClinic = async (req, res) => {
    try {
        let data = await clinicService.handleCreateNewClinicService(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);

        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
};
let getAllClinic = async (req, res) => {
    try {
        let data = await clinicService.getAllClinicService();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);

        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
}
let handleDeleteClinic = async (req, res) => {
    try {
        console.log('check id seding', req.body)
        let data = await clinicService.handleDeleteClinicService(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);

        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
};
let getDetailClinicById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinicByIdService(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
};
let handleUpdateClinic = async (req, res) => {
    try {
        let data = await clinicService.handleUpdateClinicService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
}
module.exports = {
    handleCreateNewClinic, getAllClinic,
    handleDeleteClinic, getDetailClinicById,
    handleUpdateClinic

}