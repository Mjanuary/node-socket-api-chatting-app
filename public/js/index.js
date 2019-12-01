let socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');

    // socket.emit('createMessage', {
    //     from: "WDJ",
    //     text: "whats going on!"
    // })

});

socket.on('newMessage', function (message) {
    console.log(message);
});

socket.on('disconnect', function () {
    console.log('disonnected to the server');
});