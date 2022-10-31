

window.addEventListener("load", () => {
    console.log("hi");
    const socket = io();

    let laptimeContainer = document.querySelector("#laptime");

    socket.on("laptime", (data) => {
        console.log(data);
        laptimeContainer.innerHTML += "<br>" + data;
    });
});