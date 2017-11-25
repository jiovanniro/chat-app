let socket = io(); //request to the server to open a websocket and maintain the connection

//adding an event listener on connect to server
socket.on('connect', function() {
    console.log('Connected to server');

    //on connect and auto create this email
    socket.emit('createMessage', {
        from: 'jess@example.com',
        text: 'Hey, This is Jio'
    });
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

//custom event 
//the data emitted w/ your event is the first arg to the callback
socket.on('newMessage', function(msg) {
    console.log('New message', msg);
});