import { Server as HttpServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketServer } from "socket.io";
import { Socket } from "net";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: Socket & {
    server: HttpServer & {
      io: SocketServer;
    };
  };
};

let io: SocketServer | null = null;

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io server...");
    const httpServer: HttpServer = res.socket.server as any;
    io = new SocketServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("join-chat", (chatId) => {
        socket.join(chatId);
        console.log(`User joined chat: ${chatId}`);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
export { io };

export const config = {
  api: {
    bodyParser: false,
  },
};
