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
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'jio',
    text: 'Sup'
    //run when the ack has been sent from the server to client
}, function(data) {
    console.log('Got it', data);
});

$('#message-form').on('submit', function(error) {
    error.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});