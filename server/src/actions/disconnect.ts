import { connection } from "@/db";
import { DefaultEventsMap, Server, Socket } from "socket.io";

const disconnect = async (
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
) => {
  try {
    let findUser;

    connection.query(
      "SELECT * FROM onlinelist WHERE userId = ?",
      [socket.id],
      (error, results) => {
        if (error) throw error;
        findUser = results;
      },
    );

    if (findUser) {
      connection.query(
        "DELETE FROM onlinelist WHERE userId = ?",
        [socket.id],
        (error, results) => {
          if (error) throw error;
          findUser = results;
        },
      );
    }

    io.sockets.emit("user disconnected", findUser!.nickName);

    console.log(`🚫 Client ${socket.id} has disconnected`);
  } catch (error) {
    console.log(error);
  }
};

export { disconnect };
