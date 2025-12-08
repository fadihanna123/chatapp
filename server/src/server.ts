import "dotenv/config";
import { connectDb } from "@/config";
import "dotenv/config";
import { Server, Socket } from "socket.io";
import "./config";
import { allowed_domains, serverPort } from "./utils";
import {
  disconnect,
  join,
  sendMsg,
  typingStarted,
  typingStopped,
} from "./actions";
import { IMsgs } from "./typings";

const io = new Server(Number(serverPort), {
  cors: { origin: allowed_domains?.split(", ") },
});

connectDb();

io.on("connection", async (socket: Socket) => {
  console.log(`✅ Client ${socket.id} has connected!`);

  socket.on("join", (nickName: string) => join(socket, nickName, io));

  socket.on("send message", (data: IMsgs) => sendMsg(data, io));

  socket.on("typing started", (nickName: string) =>
    typingStarted(nickName, socket),
  );

  socket.on("typing stopped", () => typingStopped(socket));

  socket.on("disconnect", () => disconnect(socket, io));
});
