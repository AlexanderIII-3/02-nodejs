let handleRes = (req, res) => {
    try {
        return res.render('test.ejs')
    } catch (error) {
        console.log(error)
    }

};

module.exports = {
    handleRes
}