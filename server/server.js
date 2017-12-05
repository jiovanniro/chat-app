//built-in
const path = require('path');
const http = require('http') //required for socketIO
//3rd party
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');

let clientPath = path.join(__dirname, '/../client');
let port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server); //websocket server
let users = new Users();

app.use(bodyParser.json());

app.use(express.static(clientPath));

//adding an event listener for a specifc event
//socket is the indiv socket
io.on('connection', (socket) => {
    console.log('New user connected');

    //listener for join
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name || !isRealString(params.room))) {
            //return prevents the following code from being called if name/room arent strings
            return callback('Name and room name are required');
        };

        socket.join(params.room);
        //socket.leave(params.join);

        //removes user from other rooms
        users.removeUser(socket.id);

        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage(
            'Admin', 
            'Welcome to the chat app!'
        ));
    
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(
            'Admin', 
            `${params.name} has joined.`
        ));

        //passing no params cause the client is waiting for an error 
        //so not sending data
        callback();
    });

    //expecting some data from the client 
    //that data is set as the arg to the callback -- message
    socket.on('createMessage', (message, callback) => {
        
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(
                user.name, 
                message.text               
            ));
        }
        callback(); //will call the callback function in the client
    });

    socket.on('disconnect', () => {
        //console.log('Client disconnected');
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));       
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));     
        }
    });
});

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
