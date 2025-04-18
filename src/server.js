import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import connectDB from './config/connectDB';
require('dotenv').config();

const app = express();

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))





viewEngine(app);
initWebRoute(app);
connectDB();
let port = process.env.PORT || 3001;
app.listen(port, () => {

    console.log('Backend listening on port:' + port);
})