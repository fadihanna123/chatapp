import { prisma } from '@/config';
import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import './config';

const io = new Server(5000, { cors: { origin: 'http://localhost:3000' } });

io.on('connection', async (socket: Socket) => {
  console.log(`✅ Client ${socket.id} has connected!`);

  socket.on('join', async (nickName: string) => {
    const payload = {
      nickName,
      joinedDatenTime: new Date(),
      userId: socket.id,
    };

    socket.emit('loginMsg', 'Success');
    io.sockets.emit('new user', payload);

    console.log(`${nickName} is joined!`);
  });

  socket.on('send message', async (author, msgVal, msgTime) => {
    io.sockets.emit('new message', {
      author,
      msg: msgVal,
      msgDatenTime: msgTime,
    });
  });

  socket.on('typing started', async (nickName: string) => {
    socket.broadcast.emit('typing started', nickName);
  });

  socket.on('typing stopped', async () => {
    socket.broadcast.emit('typing stopped');
  });

  socket.on('disconnect', async () => {
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
  });
});
