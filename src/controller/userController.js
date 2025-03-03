import userService from '../services/userService'

let handleRes = async (req, res) => {
    try {
        let data = await userService.connectDbTest();
        console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    handleRes
}