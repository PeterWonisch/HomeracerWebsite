

window.addEventListener("load", () => {
    console.log("Game connected");
    const socket = io();

    let laptimeContainer = document.querySelector("#laptime");

    socket.on("laptime", (data) => {
        console.log(data);
        laptimeContainer.innerHTML += "<br>" + data;
    });
});