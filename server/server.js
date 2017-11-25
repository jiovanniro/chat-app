//built-in
const path = require('path');
const http = require('http') //required for socketIO
//3rd party
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

let clientPath = path.join(__dirname, '/../client');
let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server); //websocket server

app.use(bodyParser.json());

app.use(express.static(clientPath));

//adding an event listener for a specifc event
//socket is the indiv socket
io.on('connection', (socket) => {
    console.log('New user connected');

    //emit used to emit events on client and server side
    socket.emit('newMessage', {
        from: 'jio', 
        text: 'Hey, can you meet up at 6',
        createdAt: 123
    });

    //expecting some data from the client 
    //so set that data as the arg to the callback -- newEmail
    socket.on('createMessage', (newMessage) => {
        console.log('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});