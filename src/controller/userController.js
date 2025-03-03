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
        return res.status(200).json({
            data


        })


    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    handleRes, handleLogin
}