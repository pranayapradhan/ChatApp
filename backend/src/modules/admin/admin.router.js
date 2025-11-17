import express from "express";
import {
  getAllUsersWithMessageCount,
  updateUsername,
  deleteUserAndMessages,
  adminCreateUser
} from "./admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/users", getAllUsersWithMessageCount);
adminRouter.put("/users/:id", updateUsername);
adminRouter.delete("/users/:id", deleteUserAndMessages);
adminRouter.post("/register", adminCreateUser);
export default adminRouter;