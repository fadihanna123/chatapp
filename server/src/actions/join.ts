import { DefaultEventsMap, Server, Socket } from "socket.io";

// join: Handle client connection
const join = (
  socket: Socket,
  nickName: string,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
) => {
  {
    if (!nickName) console.log("No nickname provided!!");

    const payload = {
      nickName,
      joinedDatenTime: new Date(),
      userId: socket.id,
    };

    try {
      socket.emit("loginMsg", "Success");
      io.sockets.emit("new user", payload);

      console.log(`${nickName} is joined!`);
    } catch (error) {
      console.log(error);
    }
  }
};

export { join };
