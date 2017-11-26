let socket = io(); //request to the server to open a websocket and maintain the connection


//adding an event listener on connect to server
socket.on('connect', function() {
    console.log('Connected to server');
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

$('[name=message]').on("keyup", function(){
    if($('[name=message]').val().length > 0) {
        $('#chat-send').removeAttr('disabled');
    } else {
        $('#chat-send').attr('disabled', 'disabled'); 
    }  
});

//custom event 
//the data emitted w/ your event is the first arg to the callback
socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('hh:mm A');
    console.log('New message', message);
    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', function(error) {
    error.preventDefault();

    let messageField = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageField.val()
    }, function () {
        messageField.val("");
    });
});

