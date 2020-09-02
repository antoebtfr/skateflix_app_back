import { Application } from "express";
import express from "./express";
import typeOrm from "./typeOrm";
import socket from "./socket";

export default  async (app: Application, server: any) => {
    await express(app);
    await typeOrm();
    await socket(server);
    console.log('Every loaders have been initialized')

}