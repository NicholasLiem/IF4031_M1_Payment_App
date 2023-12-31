import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {routes} from "./routes";
import {initContainer} from "./bootstrap";
import bodyParser from 'body-parser';

/**
 * Author: Nicholas Liem
 * Repository: https://github.com/NicholasLiem/Express_TS_REST_Boilerplate
 * License: MIT License
 * Description: This is a template repository created by Nicholas Liem.
 *              It is provided under the MIT license.
 * Date: 02/10/2023
 */

dotEnv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const serviceContainer = initContainer();
routes(app, serviceContainer);
const startServer = async () => {
    try {app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console.log('Fail to initialize server: ', error);
        process.exit(1);
    }
}

startServer().then(() => {});