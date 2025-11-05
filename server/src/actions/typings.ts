import { Socket } from 'socket.io';

const typingStarted = (nickName: string, socket: Socket) => {
  if (!nickName) console.log('No nickname provided!!');

  try {
    socket.broadcast.emit('typing started', nickName);
  } catch (error) {
    console.log(error);
  }
};
const typingStopped = (socket: Socket) => {
  try {
    socket.broadcast.emit('typing stopped');
  } catch (error) {
    console.log(error);
  }
};

export { typingStarted, typingStopped };
