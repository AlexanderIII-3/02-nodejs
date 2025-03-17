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
module.exports = {
    handleGetAllDoctor
}