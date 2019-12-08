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
                {
                    id: 323232,
                    chatId: 12312,
                    chats: [
                        {
                            by: 'me',
                            message: 'hahha i will be there',
                            date: 'date here',
                            status: true,
                            bot: {
                                state: true
                            }
                        }
                    ]
                }
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