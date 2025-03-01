import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoute from './routes/web';
import dotenv from "dotenv";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoute(app);

let port = process.env.PORT || 8386;
app.listen(port, () => {

    console.log('Backend listening on port:' + port);
})