let socket = io(); //request to the server to open a websocket and maintain the connection

function scrollToBottom() {
    //selectors
    let messages = $('#messages');

    //heights
    let clientHeight = messages.prop('clientHeight'); //.prop is a crossbrowser compatible way to fetch a property
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');

    //message height
    let newMessage = messages.children('li:last-child'); 
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight(); 

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //scrollTop is the jQuery message for setting the value
        messages.scrollTop(scrollHeight);
    }
}

//adding an event listener on connect to server
socket.on('connect', function() {
    //console.log('Connected to server');
    let params = $.deparam(window.location.search);

    //requiring the user to enter name and room before joining
    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});


socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

//requiring the user to enter text in the message field before sending 
$('[name=message]').on("keyup", function(){
    if($('[name=message]').val().length > 0) {
        $('#chat-send').removeAttr('disabled');
    } else {
        $('#chat-send').attr('disabled', 'disabled'); 
    }  
});

socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

//custom event 
//the data emitted w/ your event is the first arg to the callback
socket.on('newMessage', function(message) {
    let template = $('#message-template').html();
    let formattedTime = moment(message.createdAt).format('hh:mm A');

    let html = Mustache.render(template, {
        text: message.text,
        from: message.from, 
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();

    // let formattedTime = moment(message.createdAt).format('hh:mm A');
    // console.log('New message', message);
    // let li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
});

$('#message-form').on('submit', function(error) {
    error.preventDefault();

    let messageField = $('[name=message]');

    socket.emit('createMessage', {
        text: messageField.val()
    }, function () {
        messageField.val("");
    });
});

