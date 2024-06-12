import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4999"],
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    console.log("a user connected", socket.id)

    socket.on("disconnected", () => {
        console.log(`user Disconnected ${socket.id}`)
    })
})

export { app, io, server }