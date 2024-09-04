const socket = io();
socket.on("chat-messages", (data) => {
    document.getElementById("socket__message").innerText = data;
})