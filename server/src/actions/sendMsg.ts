import { prisma } from '@/config';
import { DefaultEventsMap, Server } from 'socket.io';

const sendMsg = async (
  author: string,
  msgVal: string,
  msgTime: Date,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  if (!author || !msgVal || !msgTime) console.log('Not all data provided!!');

  const payload = {
    author,
    msg: msgVal,
    msgDatenTime: msgTime,
  };

  try {
    const newChat = await prisma.chat.create({
      data: payload,
    });

    io.sockets.emit('new message', newChat);
  } catch (error) {
    console.log(error);
  }
};

export { sendMsg };
