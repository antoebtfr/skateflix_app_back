import { Application } from "express";
import express from "./express";
import typeOrm from "./typeOrm";

export default  async (app: Application) => {
    await express(app);
    await typeOrm();
}