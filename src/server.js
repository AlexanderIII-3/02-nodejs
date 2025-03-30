import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import dotenv from "dotenv";
import connectDB from './config/connectDB';

const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));




viewEngine(app);
initWebRoute(app);
connectDB();
let port = process.env.PORT || 3001;
app.listen(port, () => {

    console.log('Backend listening on port:' + port);
})