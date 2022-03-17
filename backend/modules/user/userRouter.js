import Router from "express";
import userController from "./userController.js";

const userRouter = new Router();

userRouter.post("/users", userController.create);
userRouter.get("/users", userController.getUsers);
userRouter.get("/users/:id", userController.getUser);
userRouter.put("/users", userController.update);
userRouter.delete("/users/:id", userController.delete);

export default userRouter;
