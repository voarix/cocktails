import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import cocktailsAdminRouter from "./cocktailsAdminRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit("admin"));
adminRouter.use("/cocktails", cocktailsAdminRouter);

export default adminRouter;
