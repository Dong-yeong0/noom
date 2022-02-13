import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

// 이렇게 하면 http서버 WebSocket 서버 둘다 다룰 수 있다.
// websocket을 사용하기 위한 작업
const server = http.createServer(app);          //http 서버
// 왜 WebSocketServer 로 하면 레퍼런스 오류 나지
const ws = new WebSocket.Server({ server });    //WebSocket 서버

function onSocketClose() {
    console.log("Disconnected from Browser ❌");
}

const sockets = [];

ws.on("connection", (socket) => {
    // 서버와 프론트 단 1:1이 아닌 1:N 으로 연결
    sockets.push(socket);
    console.log("Connected to Browser ✅");
    // 브라우저를 종료하면 실행.
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        // toString으로 변환 안하면 Blob으로 으로 프론트에게 전달
        sockets.forEach((aSocket) => aSocket.send(message.toString('utf8')));
    })
});

server.listen(3000, handleListen);