import "dotenv/config";
import { Server, Socket } from "socket.io";
import "./config";
import { prisma } from "./config";

const io = new Server(5000, { cors: { origin: "http://localhost:3000" } });

io.on("connection", async (socket: Socket) => {
  console.log(`✅ Client ${socket.id} has connected!`);

  socket.on("Join", async (nickName: string) => {
    const SaveUser = await prisma.onlinelist.create({
      data: {
        id: Number(socket.id),
        nickName: nickName,
        joinedDatenTime: new Date(),
      },
    });

    if (SaveUser) socket.emit("loginMsg", "Success");

    console.log(`${nickName} is joined!`);
  });

  const onlineListData = await prisma.onlinelist.findMany();

  io.sockets.emit("OnlineList", onlineListData);

  socket.on("Send message", async (author, msgVal, msgTime) => {
    await prisma.chat.create({
      data: {
        author,
        msg: msgVal,
        msgDatenTime: msgTime,
      },
    });

    const messagesList = await prisma.onlinelist.findMany();
    io.sockets.emit("Messages", messagesList);
  });

  socket.on("disconnect", async () => {
    const findUser = await prisma.onlinelist.findUniqueOrThrow({
      where: { id: Number(socket.id) },
    });
    if (findUser) {
      await prisma.onlinelist.delete({ where: { id: Number(socket.id) } });
    }

    console.log(`🚫 Client ${socket.id} has disconnected`);
  });
});
