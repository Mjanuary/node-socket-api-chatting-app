var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '/../public');

app.use(express.static(publicPath)); // serve the public files


http.listen(port, function(){
  console.log(`listening on *:${port}`);
});


// io --> for all connected users
// socket --> for a singular user
// socket.broadcast.emit --> this will send the notification to all the users exept the sender
io.on('connection', (socket) => {
    console.log("A new user just connected");

        // send the message  to the initial
        socket.emit('newMessage', {
            from: "Admin",
            text: "welcome to the chat app",
            createdAt: new Date().getTime()
        });

        // send the message to the rest of the user
        socket.broadcast.emit('newMessage', {
            from: 'Admin',
            text: 'New user joined!',
            createdAt: new Date().getTime()
        })

    socket.on('createMessage', (message) => {
        console.log("create message", message);

        // this will be sent to all the users
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // send the message to the rest of the user
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
        
    });

    // user is disconnected
    socket.on('disconnect', () => {
        console.log('user was disonnected to the server');
    });
});

// app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
// });

// npm run devStart