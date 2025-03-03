import express from 'express';
import userController from '../controller/userController'
let router = express.Router();
let initWebRoute = (app) => {
    router.get('/', (req, res) => {

        return res.send('hello world!')
    })
    router.get('/test', userController.handleRes)

    router.post('/api/v1/login', userController.handleLogin)
    return app.use('/', router);
}
module.exports = initWebRoute;
