
import specialtyService from "../services/specialtyService";
let postSpecialtySaveInfor = async (req, res) => {
    try {
        let data = await specialtyService.postSpecialtySaveInforService(req.body);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);

        return res.status(200).json({
            EC: 2,
            EM: 'Error From Server!'
        })
    }
};
let getAllSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.getAllSpecialtyService();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            EC: 1,
            EM: 'Error From Server!'
        })
    }
}
let handleDeleteSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.handleDeleteSpecialtyService(req.body.id);
        return res.status(200).json(data)
    } catch (error) {
        return res.status(200).json({
            EC: 1,
            EM: 'Error From Server!'
        })

    }
};
let getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyByIdService(req.query.id, req.query.location);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: 1,
            EM: 'Error From Server!'
        })

    }
};
let handleUpdateSpecialty = async (req, res) => {
    try {
        let data = await specialtyService.handleUpdateSpecialtyService(req.body);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: 1,
            EM: 'Error From Server!'
        })

    }


}
module.exports = {
    postSpecialtySaveInfor,
    getAllSpecialty,
    handleDeleteSpecialty, getDetailSpecialtyById,
    handleUpdateSpecialty
}
