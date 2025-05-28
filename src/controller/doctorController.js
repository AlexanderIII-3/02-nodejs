import doctorService from '../services/doctorService'


let getTopDoctorHome = async (req, res) => {
    // let limit = req.query.limit
    // if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(10);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
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
let getAllDocotor = async (req, res) => {
    try {
        let doctor = await doctorService.getAllDocotor();
        return res.status(200).json(doctor)
    } catch (error) {
        return res.status(200).json({
            EC: -1,
            EM: 'Error form server!'
        })
    }
}
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
let getDetailsDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailsDoctorById(req.query.id);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: 'Error from server'
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        console.log('check data sending', req.body)
        let data = await doctorService.bulkCreateScheduleService(req.body)
        if (data) {
            return res.status(200).json(data)


        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -2,
            EM: 'Error from server'
        })
    }
}
let handleCancelBooking = async (req, res) => {
    try {

        let data = await doctorService.handleCancelBookingService(req.body);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: 'Error from server'
        })
    }


}

let getScheduleByDate = async (req, res) => {
    try {
        if (!req.query.doctorId || !req.query.date) {
            return res.status(200).json({
                EC: -1,
                EM: 'Missing parameter!'
            })

        }
        let infor = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date);
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
let getListPatientForDoctor = async (req, res) => {
    try {
        let data = await doctorService.getListPatientForDoctorService(req.query.doctorId, req.query.date);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }
};
let sendingRemedy = async (req, res) => {
    try {
        console.log('check data sending', req.body)

        let data = await doctorService.sendingRemedyService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }
};
let handleSaveFollowUp = async (req, res) => {

    try {
        let data = await doctorService.handleSaveFollowUpService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }

}
let fetchAllRexam = async (req, res) => {
    try {
        let data = await doctorService.fetchAllRexamService(req.query.doctorId)
        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });
    }

}

let handleUpdateFollowUp = async (req, res) => {
    try {
        console.log('check data follow up', req.body)
        let data = await doctorService.handleUpdateFollowUpService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }

}
let handleCreateRexam = async (req, res) => {
    try {
        let data = await doctorService.handleCreateRexamService(req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }
}
let getAllDoctorProvince = async (req, res) => {
    try {
        console.log('check data province', req.query)
        let data = await doctorService.getAllDoctorProvinceService(req.query.province, req.query.specialtyId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });

    }
}
let handleDeleteRexam = async (req, res) => {
    try {
        let data = await doctorService.handleDeleteRexamService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });
    }

}
let handleUpdateRexam = async (req, res) => {
    try {
        console.log('check data reexam', req.body)
        let data = await doctorService.handleUpdateRexamService(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            EC: -1,
            EM: "Error from server"
        });
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getDetailDoctor: getDetailDoctor,
    getAllDocotor: getAllDocotor,
    postInforDoctor: postInforDoctor,
    getDetailsDoctorById: getDetailsDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getMoreInforDoctor: getMoreInforDoctor,
    getProfileInforDoctor: getProfileInforDoctor,
    getListPatientForDoctor: getListPatientForDoctor,
    sendingRemedy: sendingRemedy,
    handleCancelBooking: handleCancelBooking,
    handleSaveFollowUp: handleSaveFollowUp,
    fetchAllRexam: fetchAllRexam,
    handleUpdateFollowUp: handleUpdateFollowUp,
    handleCreateRexam: handleCreateRexam,
    getAllDoctorProvince: getAllDoctorProvince,
    handleDeleteRexam: handleDeleteRexam,
    handleUpdateRexam: handleUpdateRexam
}