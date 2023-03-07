const socket = io();

let myCurrentCell = document.createElement("td");

let laptime = "";
let speed = "";
let laptimeA = "";
let laptimeB = "";
let username = "";
let place = 0;
let string;

let headingContainer = document.querySelector("#heading");
let laptimeContainer = document.querySelector("#laptime");
let speedContainer = document.querySelector("#speed");
let laptimeInputContainer = document.querySelector("#laptimeInput");
let outputContainer = document.querySelector("#output");
let userInputContainer = document.querySelector("#userInput");
let scoreboardContainer = document.querySelector("#scoreboard");

function generateTable(data) {
    const tableLength = document.getElementById("table").rows.length-1;
    for (let i = 0; i < tableLength; i++) {
        document.getElementById("table").deleteRow(1);
    }
    let currentText;
    for (let j = 0; j < data.length-1; j++) {
        // creates a <tr> element
        const myCurrentRow = document.createElement("tr");

        for (let i = 0; i < 3; i++) {
            // creates a <td> element
            if (data[j][0]==username) {
                myCurrentCell = document.createElement("th");
                place = j+1;
                console.log("place" + place)
            } else {
                myCurrentCell = document.createElement("td");
            }
            // creates a Text Node
            if (i) {
                if (i == 1) {
                    currentText = document.createTextNode(
                        data[j][i - 1]
                    );
                } else {
                    currentText = document.createTextNode(
                        data[j][i - 1] / 1000
                    );
                }
            } else {
                if (j < 3) {
                    currentText = document.createElement('img');
                    currentText.style.width = "32px";
                    currentText.style.height = "18px";
                    switch (j) {
                        case 0: currentText.src = "/img/crown_gold.png"; break;
                        case 1: currentText.src = "/img/crown_silver.png"; break;
                        case 2: currentText.src = "/img/crown_bronze.png"; break;
                        default: currentText.src = "/img/crown_gold.png"; break;
                    }
                        
                } else {
                    currentText = document.createTextNode(
                        j + 1 + "."
                    );
                }

            }
            // appends the Text Node we created into the cell <td>
            myCurrentCell.appendChild(currentText);
            // appends the cell <td> into the row <tr>
            myCurrentRow.appendChild(myCurrentCell);
        }
        // appends the row <tr> into <tbody>
        document.getElementById("table").appendChild(myCurrentRow);
    }
    window.scrollTo(0, 39 * place + 8);
}

function startUp() {
    headingContainer.style.display = "block";
    laptimeContainer.style.display = "none";
    speedContainer.style.display = "none";
    laptimeInputContainer.style.display = "none";
    outputContainer.style.display = "none";
    socket.emit('scores');
    window.scrollTo(0, 0);
}

function startUpScoreboard() {
    socket.emit('scores');
    window.scrollTo(0, 0);
}

function addToDatabase() {
    socket.emit('data', username);
}

function addUser(input) {
    username = input;
    userInputContainer.value = "";
    laptimeInputContainer.style.display = "none";
    addToDatabase();
}

function laptimeDecoder() {
    headingContainer.innerHTML = "Rundenzeit";
    laptimeContainer.style.display = "block";
    speedContainer.style.display = "block";
    laptimeContainer.innerHTML = laptime / 1000 + "s";
    speedContainer.innerHTML = speed + "km/h";
    laptimeInput();
    window.scrollTo(0, 0);
}

function laptimeInput() {
    laptimeInputContainer.style.display = "block";
}

function search() {
    if (event.key === 'Enter') {
        addUser(document.getElementById('userInput').value)
    }
}

window.addEventListener("load", () => {

    socket.on("laptime+speed", (data) => {
        console.log(data); string = String(data).split(';'); laptime = string[0]; speed = string[1]; laptimeDecoder();
    });

    socket.on("scores", (data) => { generateTable(data) });
});