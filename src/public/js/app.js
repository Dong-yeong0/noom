const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

// 서버(Backend)랑 연결 성공 시 console로 찍음
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

// Backend쪽에서 받은 메세지를 console로 찍음
socket.addEventListener("message", (message) => {
    console.log("Just got this : ", message.data, "from the server");
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌")
})

// 서버쪽으로 message send
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
