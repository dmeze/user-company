import Router from "express";
import companyController from "./companyController.js";

const companyRouter = new Router();

companyRouter.post("/companies", companyController.create);
companyRouter.get("/companies", companyController.getCompanies);
companyRouter.get("/companies/:id", companyController.getCompany);
companyRouter.put("/companies", companyController.update);
companyRouter.delete("/companies/:id", companyController.delete);

export default companyRouter;
