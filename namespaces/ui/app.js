const socket1 = io("/namespace1");
const socket2 = io("/namespace2");

socket1.on("nsp1", (data) => {
    document.getElementById("socket__message1").innerText = data.message;
})

socket2.on("nsp2", (data) => {
    document.getElementById("socket__message2").innerText = data.message;
})