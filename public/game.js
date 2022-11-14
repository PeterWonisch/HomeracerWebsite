const socket = io();

let myCurrentCell = document.createElement("td");

let laptime = "";
let laptimeA = "";
let laptimeB = "";
let username = "";

let laptimeContainer = document.querySelector("#laptime");
let laptimeAContainer = document.querySelector("#laptimeA");
let laptimeBContainer = document.querySelector("#laptimeB");
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
            } else {
                myCurrentCell = document.createElement("td");
            }
            // creates a Text Node
            if (i) {
                currentText = document.createTextNode(
                    data[j][i-1]
                );
            } else {
                if (j < 3) {
                    currentText = document.createElement('img');
                    currentText.style.width = "20px";
                    currentText.style.height = "20px";
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
}

function startUp() {
    laptimeContainer.style.display = "block";
    laptimeAContainer.style.display = "none";
    laptimeBContainer.style.display = "none";
    laptimeInputContainer.style.display = "none";
    outputContainer.style.display = "none";
    socket.emit('scores');
}

function startUpScoreboard() {
    socket.emit('scores');
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
/*
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
    } else {*/
        laptimeContainer.style.display = "block";
        laptimeAContainer.style.display = "none";
        laptimeBContainer.style.display = "none";
        laptimeContainer.innerHTML = laptime;
        laptimeInput();
    //}
}

function laptimeInput() {
    laptimeInputContainer.style.display = "block";
}

window.addEventListener("load", () => {
    console.log("test");

    socket.on("laptime", (data) => {
        console.log(data); laptime = data; laptimeDecoder();
    });

    socket.on("scores", (data) => { generateTable(data) });
});