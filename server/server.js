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


io.on('connection', (socket) => {
    console.log("A new user just connected");
    
    socket.on('disconnect', () => {
        console.log('user was disonnected to the server');
    });
});

// app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
// });