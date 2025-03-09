import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import dotenv from "dotenv";
import connectDB from './config/connectDB';
var cors = require('cors')

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoute(app);
connectDB();
let port = process.env.PORT || 3001;
app.listen(port, () => {

    console.log('Backend listening on port:' + port);
})