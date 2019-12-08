const express = require('express');
let app = express();

const http = require('http').createServer(app);
let io = require('socket.io')(http);
const path = require('path');
const {Users} = require('./utils/users');

// import uuid
const uuidv1 = require('uuid/v1');

let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealSting'); 
app.use(express.static(publicPath)); // serve the public files

let users = new Users(); // users instance


http.listen(port, function(){
  console.log(`listening on *:${port}`);
    console.log(uuidv1());
    

});


// io --> for all connected users
// socket --> for a singular user
// socket.broadcast.emit --> this will send the notification to all the users exept the sender
io.on('connection', (socket) => {
    console.log('a new use is connected now');

    socket.on('register', (data, callback) => {
        
        console.log(data);        
        callback('this is ...');
    });





});






// npm run devStart