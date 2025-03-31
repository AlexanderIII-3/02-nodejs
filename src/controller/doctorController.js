import doctorService from '../services/doctorService'

let handleGetAllDoctor = async (req, res) => {

    try {
        let data = await doctorService.handleGetAllDoctorService();
        if (data) {
            return res.status(200).json(data);
        } else {
            data = {};
            return res.status(200).json(data);

        }



    } catch (error) {
        console.log(error);
        return res.status(404).json({
            EM: 'Error from server',
            EC: -1
        })
    }
};

let postInforDoctor = async (req, res) => {
    try {

        let response = await doctorService.postInforDoctorSevice(req.body);

        return res.status(200).json(response)

    } catch (error) {
        return res.status(200).json({
            EC: -1,
            EM: 'Error from server'
        })

    }
}
let getDetailDoctor = async (req, res) => {
    let id = req.query
    try {
        let response = await doctorService.getDetailDoctorService(id);
        if (response) {


            return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -2,
            EM: "Error from server!"
        })
    }
}

let getDetailsDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailsDoctorByIdService(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getMoreInforDoctor = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let data = await doctorService.getMoreInforDoctorService(doctorId)
        return res.status(200).json(data)

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let getProfileInforDoctor = async (req, res) => {
    try {
        let data = await doctorService.getProfileInforDoctorService(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }
}
module.exports = {
    handleGetAllDoctor, postInforDoctor,
    getDetailDoctor, getDetailsDoctorById,
    getMoreInforDoctor, getProfileInforDoctor
}