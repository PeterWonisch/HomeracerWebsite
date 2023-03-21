const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require('http');
const { Server } = require("socket.io");
const path = require('path')
const { dirname } = require('path');


const app = express();
const server = http.createServer(app);
const io = new Server(server);
//const io = new Server(server, { path: "/" });
const PORT = process.env.PORT || 3000
const appDir = dirname(require.main.filename);

let i = 0;
let laptime;
let data = "";
let bestLaptime = "";
let firstUserConnect = 1;
let scores;
let string;
let speed;
let twoPlayer = false; //false = Singleplayer; true = 2 Player
let gamemode = false; //false = full speed cycling; true = measured cycling
let recording = false;
let state = 0;

//for urlencoded message
//app.use(bodyParser.urlencoded({ extended: false }));

//for json formated message
//app.use(bodyParser.json());

//for plain text (String)
app.use(bodyParser.text());

app.use(express.static('public'));
app.use('/img', express.static('img'));
app.use('/css', express.static('css'));

app.post("/",(req,res) => {
    console.log('apppost'); data = req.body; console.log(data); res.send("OK"); dataDecoder();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/devGame', (req, res) => {
    res.sendFile('game.html', {root: __dirname })
});
app.get('/scoreboard', (req, res) => {
    res.sendFile('scoreboard.html', {root: __dirname })
});
app.get('/impressum', (req, res) => {
    res.sendFile('impressum.html', { root: __dirname })
});
app.get('/datenschutz', (req, res) => {
    res.sendFile('datenschutz.html', { root: __dirname })
});
app.get('/devScoreboard', (req, res) => {
    res.sendFile('scoreboard.txt', { root: __dirname })
});
app.get('/devDeleteScores', (req, res) => {
    scores = [];
    fs.unlinkSync('scoreboard.txt')

});

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

function dataDecoder() {
    console.log('dataDecoder');
    string = String(data).split(';');
    laptime = string[0];
    speed = string[1];
    io.emit("laptime+speed", data);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    function readScoreboard() {
        fs.readFile('scoreboard.txt', (err, data) => {
            scores = String(data).split(';');
            for (let j=0;j<scores.length;j++) {
                scores[j] = scores[j].split(',');
            }
            for (let i = 0; i < scores.length-1; i++) {
                for (let j = i+1; j < scores.length-1; j++) {
                    if (+scores[i][1] > +scores[j][1]) {
                        const temp = scores[i];
                        scores[i] = scores[j];
                        scores[j] = temp;
                    }
                }
            }
            console.log(scores);
            socket.emit('scores', scores)
        })
    }

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('page', (msg) => {
        console.log('page: ' + msg);
        
    });
    socket.on('data', (username) => {
        fs.appendFile('scoreboard.txt', username + "," + laptime + ";", function (err) {       //change i to laptime
            if (err) throw err;
            setTimeout(() => { readScoreboard() }, 100);
        });
    });

    socket.on('scores', readScoreboard);
    /*
    if (firstUserConnect) {
        console.log('laptime simulation started');
        firstUserConnect = 0;
        setInterval(() => {
            i++;
            io.emit("laptime+speed", i + ";56.9");
        }, 10000);
    }*/
});



//app.listen(PORT, () => {
//  console.log('listening on ' + PORT);
//});

server.listen(PORT);