import userService from '../services/userService'

let handleRes = async (req, res) => {
    try {
        let data = await userService.connectDbTest();
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

};
let handleLogin = async (req, res) => {
    let dataInput = req.body
    try {


        if (!dataInput.email || !dataInput.password) {
            res.status(404).json({
                EC: -1,
                EM: 'Missing parameters!'

            })
        }

        let data = await userService.handleLoginService(dataInput.email, dataInput.password)
        return res.status(200).json(
            data


        )


    } catch (error) {
        console.log(error)
    }

}
//crud user
let handleCreateUser = async (req, res) => {
    try {


        let data = req.body;
        if (!data.email || !data.password) {
            return res.status(404).json({
                EC: -1,
                EM: "Missing parameters"
            })
        }
        else {
            let user = await userService.handleCreateUserService(data)
            return res.status(200).json({
                user


            })
        }


    } catch (error) {
        console.log(error)
    }
};
let handleGetAllUsers = async (req, res) => {
    try {
        let data = await userService.handleGetAllUserService()
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log(error)
    }

};

let handleUpdateUser = async (req, res) => {

    try {
        let data = await userService.handleUpdateUserService(req.body);
        return res.status(200).json(
            data
        )
    } catch (error) {
        console.log(error)
    }
}
let handleDeleteUser = async (req, res) => {

    try {

        let id = req.body.id;
        if (!id) {
            res.status(200).json({
                EC: 1,
                EM: 'Missing parameter Id!'
            })
        } else {
            let data = await userService.handleDeleteUserService(id);
            return res.status(200).json(data);


        }
    } catch (error) {
        console.log(error)
    }
};





let handleGetAllCode = async (req, res) => {

    try {
        let type = req.query.type
        if (!type) {
            return res.status(404).json({
                EM: 'Missing parameter',
                EC: -1
            })
        }
        else {
            let data = await userService.handleGetAllCodeServices(type)

            return res.status(200).json(data)

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
    handleRes, handleLogin,
    handleCreateUser, handleGetAllUsers,
    handleDeleteUser, handleGetAllCode,
    handleUpdateUser

}