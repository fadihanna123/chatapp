import { Server, Socket } from "socket.io";
import "./config";

import { MsgModel } from "./models";
import { JoinListModel } from "./models";

const io = new Server(5000, { cors: { origin: "http://localhost:3000" } });

io.on("connection", async (socket: Socket) => {
  console.log(`✅ Client ${socket.id} has connected!`);

  socket.on("Join", async (nickName: string) => {
    const JoinList = new JoinListModel();
    JoinList.id = socket.id;
    JoinList.nickName = nickName;
    JoinList.joinedDatenTime = new Date();
    const SaveUser = await JoinList.save();

    SaveUser && socket.emit("loginMsg", "Success");

    console.log(`${nickName} is joined!`);
  });

  const onlineListData = await JoinListModel.find({ id: socket.id });
  io.sockets.emit("OnlineList", onlineListData);

  socket.on("Send message", async (author, msgVal, msgTime) => {
    const sendMsgModel = new MsgModel();
    sendMsgModel.author = author;
    sendMsgModel.msg = msgVal;
    sendMsgModel.msgDatenTime = msgTime;
    await sendMsgModel.save();

    const messagesList = await MsgModel.find({});
    io.sockets.emit("Messages", messagesList);
  });

  socket.on("disconnect", async () => {
    await JoinListModel.findOneAndDelete({ id: socket.id });
    console.log(`🚫 Client ${socket.id} has disconnected`);
  });
});
