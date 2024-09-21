import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { routes } from "./router/routes";
import cors from "cors";
import {UserAuthenticate} from './middleware/auth.middleware'
import { createServer } from "http";
import { Server } from "socket.io";
import { getDatabase } from "./database/initialize/init";

const app = express();
app.use(express.json());
const EXPRESS_PORT = 4000;

// Use cookie-parser middleware
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}));
app.use(UserAuthenticate);
routes(app);



// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   console.log("socket---------->",socket)
//   // ...
// });


app.listen(EXPRESS_PORT, async () => {
  getDatabase();
  console.log("INFO :: Webserver started on port " + EXPRESS_PORT);
});
