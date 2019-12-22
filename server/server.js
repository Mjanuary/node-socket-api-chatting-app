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


io.on('connection', (socket) => {
    console.log("A new user just connected");
    // console.log('connected users ', users.getUserList());


    // registration
    socket.on('join', (params, callback) => {

        users.removeUser(params.uid, (data) => {
            // console.log('remove user: ', data);
        }, 'id');

        users.addUser(params.uid, socket.id, params.groups, (id, user) => {
            socket.broadcast.to(id).emit('aConnectedUser',user);
            // console.log(user, ' joined => ', id);
            socket.join(id);
        });

        io.to(params.groups).emit('updateUserList', users.activeUsers(params.groups));

        // send the message  to the initial
        socket.emit('activeUsers', users.activeUsers(params.uid));
        // socket.emit('newMessage', 'admin says you are welcome');
        // console.log('active: ', users.activeUsers(socket.id));
        
        // send the message to the rest of the user
        for (const key in users.userGroups(params.uid)) {
            let group = users.userGroups(params.uid)[key];
            socket.broadcast.to(group).emit('newMessage','new user joined');
        }


        socket.on('createMessage', (message, callback) => {
            // socket.broadcast.to(params.room).emit('newMessage', generateMessage(params.name ,message.text));
            // io.to(message.group).emit('newMessage', message);
            socket.broadcast.to(message.group).emit('newMessage', message);
            
            callback('message received.');        
        });

    callback('');
    });


    // user is disconnected
    socket.on('disconnect', () => {
   
        users.removeUser(socket.id, (data) => {
            let user = {
                ...users.getUser(socket.id, 'key'),
                ...data
            };
            socket.broadcast.to(data.groupId).emit('adDisconnectedUser',user);
            
            // users.groupId = data.groupId;
            // console.log('USERS IS: ',user);
            

            // console.log(users.users);
            
            // tell the users that the user is offline
            // function to remove the chats
            // console.log('x: ',data);
            // console.log('DISCONNECTED: ', data);
            
        });
        

        // let user = users.removeUser(socket.id);

        // if (user) {
        //     io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        //     io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room} chat room`));
        // }
    });

    socket.on('updateUsersList', function(users) {
        console.log(users);
        
    });


    socket.on('typing', function(typing) {
        // console.log(typing);
        socket.broadcast.to(typing.groupId).emit('trpingBack', typing);
        
    });


    // 
    socket.on('createLocationMessage', (data, callback) => {
        console.log('The location: ', data);
        callback(data);
        socket.emit('newLocationMessage', generateLocationMessage('Admin', data.lat,data.lng));

    });


    

});

// alice@gmail.com
// emoji icons
// https://emojipedia.org/white-up-pointing-index/
//🐑
// npm run devStart