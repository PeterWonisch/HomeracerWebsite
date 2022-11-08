
let laptime = "";
let laptimeA = "";
let laptimeB = "";

let laptimeContainer = document.querySelector("#laptime");
let laptimeAContainer = document.querySelector("#laptimeA");
let laptimeBContainer = document.querySelector("#laptimeB");
let laptimeInputContainer = document.querySelector("#laptimeInput");
let outputContainer = document.querySelector("#output");
let userInputContainer = document.querySelector("#userInput");


function startUp() {
    laptimeContainer.style.display = "block";
    laptimeAContainer.style.display = "none";
    laptimeBContainer.style.display = "none";
    laptimeInputContainer.style.display = "none";
    outputContainer.style.display = "none";
}

function addUser(username) {
    userInputContainer.value = "";
    laptimeInputContainer.style.display = "none";
    outputContainer.style.display = "block";
    outputContainer.innerHTML = username;
}

function laptimeDecoder() {
    if (laptime.charAt(0) == "A") {
        laptimeA = laptime.substr(1);
        laptimeContainer.style.display = "none";
        laptimeAContainer.style.display = "block";
        laptimeAContainer.innerHTML = laptimeA;
    } else if (laptime.charAt(0) == "B") {
        laptimeB = laptime.substr(1);
        laptimeContainer.style.display = "none";
        laptimeBContainer.style.display = "block";
        laptimeBContainer.innerHTML = laptimeB;
    } else {
        laptimeContainer.style.display = "block";
        laptimeAContainer.style.display = "none";
        laptimeBContainer.style.display = "none";
        laptimeContainer.innerHTML = laptime;
        laptimeInput();
    }
}

function laptimeInput() {
    laptimeInputContainer.style.display = "block";
}

window.addEventListener("load", () => {
    console.log("test");
    const socket = io();

    socket.on("laptime", (data) => {
        console.log(data); laptime = data; laptimeDecoder();
    });
});