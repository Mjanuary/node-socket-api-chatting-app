const express = require('express');
let app = express();

const http = require('http').createServer(app);
let io = require('socket.io')(http);
const path = require('path');
const {Users} = require('./utils/users');

// import uuid
const uuidv1 = require('uuid/v1');
const axios = require('axios');


let port = process.env.PORT || 3000;
let publicPath = path.join(__dirname, '/../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealSting'); 
app.use(express.static(publicPath)); // serve the public files

let users = new Users(); // users instance


http.listen(port, function(){
  console.log(`listening on *:${port}`);
    console.log(uuidv1());
    
    // users.registerDB({ 
    //     email: 'kelly@gmail.com',
    //     password: '12345qwert@',
    //     phone: '0786674648',
    //     username: 'kelly',
    //     names: 'mahoro kelly',
    //     country: 'Rwanda' });

    // users.sync();

    // users.updatePassword({password: 'janvier is updating the password'});
    // console.log(users.usersDB);

    // users.login({
    //     email: 'alice@gmail.com',
    //     password: '12345qwert@'
    // });

});


function beautify(data, done){
    const datas = [];
    for (const property in data) {
        let newOBJ = data[property];
        newOBJ.key = property; 
        datas.push(newOBJ);
    }

    done(datas);
}


function loginUser(data, crd, done) {
    let found = false;
    let userFound = '';

    console.log('data xxxx: ', data);
    console.log('crd: ', crd);

    
    for (const property in data) {
        let newOBJ = data[property];

    //     console.log(newOBJ);
    //     console.log(data[property]);
        if (data[property].password == crd.password && data[property].email == crd.email) {
    //         userFound = data[property];
    //         found = true;
    //         // console.log(data[i]);
            
    //         done({
    //             status: true,
    //             user: userFound
    //         });
    //         // break;
        }
        
        

    //     // newOBJ.key = property; 
    //     // datas.push(newOBJ);
    }

    done('yes done');
}


// io --> for all connected users
// socket --> for a singular user
// socket.broadcast.emit --> this will send the notification to all the users exept the sender
io.on('connection', (socket) => {
    console.log('a new use is connected now');
    // users.synco();
    socket.on('register', (data, callback) => {
        console.log(data);        
        callback('this is ...');
    });


    socket.on('login', (credentials, callback) => {
        // users.login(data);
        // console.log(users.users);        
        // callback('this is ... the login in action');




        axios.get('https://african-chat-app.firebaseio.com/users.json')
        .then((response) => {
          // handle success
          console.log('responded --------------------------44444----------------');
        //   console.log(response);
          beautify(response, (data) => {
            // console.log(data);
            loginUser(data,credentials, (result) => {
                console.log('the result found is:', result);
                
            });
          });
            // sstart the login






          
        //   console.log(this.beautify(response));
        //   callback(this.beautify(response));
        //   this.users = this.beautify(response);
        //   console.log(this.beautify(response));
        callback(response);
        })
        .catch(function (error) {
          // handle error
        //   console.log('firebase: ');
        //   console.log(error);
        })
        .finally(function () {
            //// always executed
            //   if (passes !== '') {
            //     passes();
            //   }
            //   console.log(response);
        });     



    });


});


// alice@gmail.com
// emoji icons
// https://emojipedia.org/white-up-pointing-index/

// npm run devStart