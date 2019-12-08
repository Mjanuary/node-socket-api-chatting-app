const express = require('express');
let app = express();

const http = require('http').createServer(app);
let io = require('socket.io')(http);
const path = require('path');
const {Users} = require('./utils/users');

let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealSting'); 
app.use(express.static(publicPath)); // serve the public files

let users = new Users(); // users instance


http.listen(port, function(){
  console.log(`listening on *:${port}`);
});


// io --> for all connected users
// socket --> for a singular user
// socket.broadcast.emit --> this will send the notification to all the users exept the sender
io.on('connection', (socket) => {
    console.log("A new user just connected");
    // registration
    socket.on('join', (params, callback) => {
    
    if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and Room are required');
    }

    // join the room
    socket.join(params.room);
    
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // tell the ui the new user who joined the group
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // send the message  to the initial
    socket.emit('newMessage', generateMessage('Admin', `welcome to ${params.room}!`));

    // send the message to the rest of the user
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', 'New user joined!'));



    socket.on('createMessage', (message, callback) => {
        // socket.broadcast.to(params.room).emit('newMessage', generateMessage(params.name ,message.text));
        io.to(params.room).emit('newMessage', generateMessage(params.name ,message.text));

        callback('this is ...');        
    });


    callback('');

    });


    // socket.on('createMessage', (message, callback) => {
    //     console.log("create message: ", message);

    //     // this will be sent to all the users
    //     // io.emit('newMessage', generateMessage(message.from,message.text))

    //     // send the message to the rest of the user
    //     socket.emit('newMessage', generateMessage(message.from,message.text));
    //     // socket.broadcast.emit('newMessage', generateMessage(message.from,message.text));

    //     callback('this is the server');        
    // });

    // user is disconnected
    socket.on('disconnect', () => {
        // console.log('user was disonnected to the server');
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room`));
        }
    });

    socket.on('updateUsersList', function(users) {
        console.log(users);
        
    });

    //
    socket.on('createLocationMessage', (data, callback) => {
        console.log('The location: ', data);
        callback(data);
        socket.emit('newLocationMessage', generateLocationMessage('Admin', data.lat,data.lng));

    });


    

});





// npm run devStart