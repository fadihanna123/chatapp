import { connection } from "@/db";
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
    connection.query(
      "INSERT INTO chats (author, msg, msgDatenTime) VALUES (?, ?, ?)",
      [data.author, data.msg, data.msgDatenTime],
      (error) => {
        if (error) throw error;
        console.log("Message saved to database");
      },
    );

    io.sockets.emit("new message", payload);
  } catch (error) {
    console.log(error);
  }
};

export { sendMsg };
