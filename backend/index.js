import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { Server } from "socket.io";
import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/user/user.router.js";
import messageRouter from "./src/modules/message/message.router.js";
import { dbConnection } from "./src/config/mongodb.js"
import setupSocket from "./socket.js";
import adminRouter from "./src/modules/admin/admin.router.js"
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/admin",adminRouter)


setupSocket(io);

dbConnection();

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));