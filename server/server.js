//built-in
const path = require('path');
const http = require('http') //required for socketIO
//3rd party
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
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

    socket.emit('newMessage', generateMessage(
        'Admin', 
        'Welcome to the chat app'
    ));

    socket.broadcast.emit('newMessage', generateMessage(
        'Admin', 
        'New user joined'
    ));

    //expecting some data from the client 
    //that data is set as the arg to the callback -- message
    socket.on('createMessage', (message, callback) => {
        console.log('newMessage', message);
        io.emit('newMessage', generateMessage(
            message.from, 
            message.text
        ));
        callback('This is from the server'); //will call the callback function in the client
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});