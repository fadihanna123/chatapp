import { prisma } from "@/config";
import { IMsgs } from "@/typings";
import { DefaultEventsMap, Server } from "socket.io";

const sendMsg = async (
  data: IMsgs,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
) => {
  if (!data.author || !data.msg || !data.msgDatenTime)
    console.log("Not all data provided!!");

  const payload = {
    author: data.author,
    msg: data.msg,
    msgDatenTime: data.msgDatenTime,
  };

  try {
    const newChat = await prisma.chat.create({
      data: payload,
    });

    io.sockets.emit("new message", newChat);
  } catch (error) {
    console.log(error);
  }
};

export { sendMsg };
