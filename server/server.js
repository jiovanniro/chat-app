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

    socket.emit('newMessage', {
        //getting from and text property from the client
        from: 'admin',
        text: 'Welcome to the chat app bruh',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined',
        createdAt: new Date().getTime()       
    }); 

    //expecting some data from the client 
    //that data is set as the arg to the callback -- message
    socket.on('createMessage', (message) => {
        console.log('newMessage', message);
        io.emit('newMessage', {
            //getting from and text property from the client
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })

        //broadcasting
        //specific the socket to not send 
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()       
        // });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});