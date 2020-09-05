import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export default (app:Application) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cors());

    app.use('/uploads', express.static('uploads'));
    app.use('/img', express.static('img'));
}