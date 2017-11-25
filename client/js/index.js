let socket = io(); //request to the server to open a websocket and maintain the connection

//adding an event listener on connect to server
socket.on('connect', function() {
    console.log('Connected to server');
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

//custom event 
//the data emitted w/ your event is the first arg to the callback
socket.on('newMessage', function(message) {
    console.log('New message', message);
});