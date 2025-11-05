import { prisma } from '@/config';
import { DefaultEventsMap, Server, Socket } from 'socket.io';

const disconnect = async (
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  try {
    const findUser = await prisma.onlinelist.findFirst({
      where: { userId: socket.id },
    });

    if (findUser) {
      await prisma.onlinelist.deleteMany({
        where: { userId: socket.id },
      });
    }

    io.sockets.emit('user disconnected', findUser?.nickName);

    console.log(`🚫 Client ${socket.id} has disconnected`);
  } catch (error) {
    console.log(error);
  }
};

export { disconnect };
