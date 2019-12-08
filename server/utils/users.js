// [
    // {
    //     id: 'sfwefsdfsdf',
    //     email: 'WJD',
    //     password: 'Node Js',
    //     info: {
    //         names: 'muhawenimana janv9oer',
    //         phone: 12121321313,
    //         country: 'Rwanda'
    //     },
    //     friends: [
    //         {
    //             id: 323232,
    //             chatId: 12312,
    //             chats: [
    //                 {
    //                     by: 'me',
    //                     message: 'hahha i will be there',
    //                     date: 'date here',
    //                     status: true,
    //                     bot: {
    //                         state: true
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // }
// ]
const axios = require('axios');

class Users {
    constructor() {
        this.users = [];
        this.synco();
    }

    synco(passes = '') {
        console.log('user registered');

        axios.get('https://african-chat-app.firebaseio.com/users.json')
        .then((response) => {
          // handle success
        //   console.log('responded ------------------------------------------');
          console.log(this.beautify(response));
          
          this.users = this.beautify(response);
          console.log(this.beautify(response));
          
        })
        .catch(function (error) {
          // handle error
        //   console.log('firebase: ');
        //   console.log(error);
        })
        .finally(function (response) {
          // always executed
          if (passes !== '') {
            passes();
          }

          console.log(response);

        });        
    }

    // change the format of the json
    beautify(data) {
        const datas = [];
        for (const property in data) {
            let newOBJ = data[property];
            newOBJ.key = property; 
            datas.push(newOBJ);
        }

        return datas;
    }


    // LOGIN 
    login(data, crd, done) {
        let found = false;
        let userFound = '';

        console.log('data: ');
        console.log(data);
        
        for (const property in data) {
            let newOBJ = data[property];

            console.log(newOBJ);
            console.log(data[property]);
            if (data[property].password == crd.password && data[property].email == crd.email) {
                userFound = data[property];
                found = true;
                // console.log(data[i]);
                
                done({
                    status: true,
                    user: userFound
                });
                // break;
            }
            
            

            // newOBJ.key = property; 
            // datas.push(newOBJ);
        }




        // let userFound = '';

        // console.log(data);

        // for (let i = 0; i < data.length; i++) {
        //     // console.log(data[i].password);
            
        //     if (data[i].password == crd.password && data[i].email == crd.email) {
        //         userFound = data[i];
        //         found = true;
        //         console.log(data[i]);
                
        //         console.log(data[i]);
        //         done({
        //             status: true,
        //             user: userFound
        //         });
        //         break;
        //     }
        // }
        // if (found) {
        //     done({
        //         status: true,
        //         user: userFound
        //     });
        // } else {
        //     done({
        //         status: false,
        //         user: null
        //     });            
        // }
    }

    registerDB(user) {
        axios.post('https://african-chat-app.firebaseio.com/users.json', user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    updatePassword(user) {
        axios.put('https://african-chat-app.firebaseio.com/users/-Lv_fZEcOjPC_SWPIxRA/password.json', user)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    update(users) {
        this.users = users;
    }

    register(user) {
        let newUser = {
            id: user.id,
            email: user.email,
            password: user.password,
            info: {
                names: user.names,
                phone: user.phone,
                country: user.phone
            },
            friends: [
                // {
                //     id: 323232,
                //     chatId: 12312,
                //     chats: [
                //         {
                //             by: 'me',
                //             message: 'hahha i will be there',
                //             date: 'date here',
                //             status: true,
                //             bot: {
                //                 state: true
                //             }
                //         }
                //     ]
                // }
            ]
        };
    }



















    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUserList (room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id != id)
        }

        return user;
    }
}


module.exports = {Users};

// https://fierce-mesa-64195.herokuapp.com/index.html