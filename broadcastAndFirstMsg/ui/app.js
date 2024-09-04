const socket = io();

socket.on("firstMsg", (data) => {
    document.getElementById("socket__message").innerText = data.message;
})