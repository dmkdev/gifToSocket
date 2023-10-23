import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Server, Socket } from "socket.io";

//let io: Server;

// This function can be marked `async` if using `await` inside
export default function handler(req: NextRequest, res: NextResponse) {

  if (!(res.socket as any).server.io) {
    const io = new Server((res.socket as any).server);

    io.use((socket, next) => {
      // Perform authentication logic here
      const token = socket.handshake.auth.token;

      console.log(token);

      // if (!token) {
      //   return next(new Error("Unauthorized"));
      // }

      // Set the authenticated user on the socket object
      // You can use this user object in event handlers
      //socket.user = { id: 1, name: "John" };

      next();
    });

    io.on("connection", (socket: Socket) => {
      // Access the authenticated user from the socket object
      // const user = socket.user ?? "Anonymous";
      // console.log("Authenticated user:", user);
      console.log("Client connected");

      socket.on("message", (message: string) => {
        console.log("Received message:", message);
        io.emit("message", message);
      });
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  return NextResponse.next();

  //return NextResponse.redirect(new URL('/home', request.url))
}
