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
const PORT = process.env.PORT || 5000
const appDir = dirname(require.main.filename);

let i = 0;
let laptime = "";

//for urlencoded message
//app.use(bodyParser.urlencoded({ extended: false }));

//for json formated message
//app.use(bodyParser.json());

//for plain text (String)
app.use(bodyParser.text());

app.use(express.static('public'));
app.use('/img', express.static('img'));

app.post("/",(req,res) => {
    laptime = req.body; console.log(laptime); res.send("OK");
    io.emit("laptime", laptime);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
app.get('/team', (req, res) => {
    res.sendFile('impressum.html', {root: __dirname })
});
app.get('/sponsoring', (req, res) => {
    res.sendFile('team.html', {root: __dirname })
});
app.get('/game', (req, res) => {
    res.sendFile('game.html', {root: __dirname })
});
app.get('/scoreboard', (req, res) => {
    res.sendFile('scoreboard.html', {root: __dirname })
});
app.get('/contact', (req, res) => {
    res.sendFile('contact.html', {root: __dirname })
});
app.get('/impressum', (req, res) => {
    res.sendFile('impressum.html', { root: __dirname })
});
app.get('/datenschutz', (req, res) => {
    res.sendFile('datenschutz.html', { root: __dirname })
});
app.get('/lap', (req, res) => {
    res.send(laptime)
});

/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('page', (msg) => {
        console.log('page: ' + msg);
        
    });
    /*
    setInterval(() => {
        socket.emit("laptime", i++);
    }, 1000);*/
});

//app.listen(PORT, () => {
//  console.log('listening on ' + PORT);
//});

server.listen(PORT);