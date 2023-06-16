import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
app.use(express.static('dist'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`,
  },
});

io.use((socket, next) => {
  socket.userId = socket.handshake.auth.user._id;
  socket.username = socket.handshake.auth.user.username;
  next();
});

io.on('connection', (socket) => {
  console.log(`user ${socket.userId} connected with socket id ${socket.id}`);

  socket.on('friendRequest', (friendId) => {
    for (let [id, socket] of io.sockets.sockets) {
      if (socket.userId == friendId) {
        console.log(`sending friend request to client ${id}`);
        io.to(id).emit('friendRequest', {
          userId: socket.userId,
          username: socket.username,
        });
        break;
      }
    }
  });

  socket.on('friendRequestAccepted', (friendId) => {
    for (let [id, socket] of io.sockets.sockets) {
      if (socket.userId == friendId) {
        console.log(`sending friend request accepted to client ${id}`);
        io.to(id).emit('friendRequestAccepted', {
          userId: socket.userId,
          username: socket.username,
        });
        break;
      }
    }
  });

  socket.on('newPost', ({ postId, friendIds }) => {
    for (let [id, socket] of io.sockets.sockets) {
      if (friendIds.includes(socket.userId)) {
        console.log(`sending new post to client ${id}`);
        io.to(id).emit('newPost', {
          postId: postId,
          userId: socket.userId,
          username: socket.username,
        });
      }
    }
  });

  socket.on('newLike', ({ postId, userId }) => {
    for (let [id, socket] of io.sockets.sockets) {
      if (socket.userId == userId) {
        console.log(`sending new like to client ${id}`);
        io.to(id).emit('newLike', {
          postId: postId,
          userId: socket.userId,
          username: socket.username,
        });
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`user ${socket.userId} disconnected`);
  });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
