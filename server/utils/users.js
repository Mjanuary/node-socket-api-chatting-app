// {
//     id: id, 
//     uid: uid, 
//     rooms: [
//         123, 123,432
//     ]
// };

// class Users {
//     constructor() {
//         this.users = [];        
//     }

//     addUser(id, name, room) {
//         let user = {
//             id: id, 
//             uid: uid, 
//             rooms: rooms
//         };

//         this.users.push(user);
//         return user;
//     }

//     getUserList (room) {
//         let users = this.users.filter((user) => user.room === room);
//         let namesArray = users.map((user) => user.name);

//         return namesArray;
//     }

//     getUser(id) {
//         return this.users.filter((user) => user.id === id)[0];
//     }

//     removeUser(id) {
//         let user = this.getUser(id);

//         if (user) {
//             this.users = this.users.filter((user) => user.id != id)
//         }

//         return user;
//     }
// }


// module.exports = {Users}; //#####




// // [
//     // {
//     //     id: 'sfwefsdfsdf',
//     //     email: 'WJD',
//     //     password: 'Node Js',
//     //     info: {
//     //         names: 'muhawenimana janv9oer',
//     //         phone: 12121321313,
//     //         country: 'Rwanda'
//     //     },
//     //     friends: [
//     //         {
//     //             id: 323232,
//     //             chatId: 12312,
//     //             chats: [
//     //                 {
//     //                     by: 'me',
//     //                     message: 'hahha i will be there',
//     //                     date: 'date here',
//     //                     status: true,
//     //                     bot: {
//     //                         state: true
//     //                     }
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     // }
// // ]
// const axios = require('axios');

// class Users {
//     constructor() {
//         this.users = [];
//         this.synco();
//     }

//     synco(passes = '') {
//         console.log('user registered');

//         axios.get('https://african-chat-app.firebaseio.com/users.json')
//         .then((response) => {
//           // handle success
//         //   console.log('responded ------------------------------------------');
//           console.log(this.beautify(response));
          
//           this.users = this.beautify(response);
//           console.log(this.beautify(response));
          
//         })
//         .catch(function (error) {
//           // handle error
//         //   console.log('firebase: ');
//         //   console.log(error);
//         })
//         .finally(function (response) {
//           // always executed
//           if (passes !== '') {
//             passes();
//           }

//           console.log(response);

//         });        
//     }

//     // change the format of the json
//     beautify(data) {
//         const datas = [];
//         for (const property in data) {
//             let newOBJ = data[property];
//             newOBJ.key = property; 
//             datas.push(newOBJ);
//         }

//         return datas;
//     }


//     // LOGIN 
//     login(data, crd, done) {
//         let found = false;
//         let userFound = '';

//         console.log('data: ');
//         console.log(data);
        
//         for (const property in data) {
//             let newOBJ = data[property];

//             console.log(newOBJ);
//             console.log(data[property]);
//             if (data[property].password == crd.password && data[property].email == crd.email) {
//                 userFound = data[property];
//                 found = true;
//                 // console.log(data[i]);
                
//                 done({
//                     status: true,
//                     user: userFound
//                 });
//                 // break;
//             }
            
            

//             // newOBJ.key = property; 
//             // datas.push(newOBJ);
//         }




//         // let userFound = '';

//         // console.log(data);

//         // for (let i = 0; i < data.length; i++) {
//         //     // console.log(data[i].password);
            
//         //     if (data[i].password == crd.password && data[i].email == crd.email) {
//         //         userFound = data[i];
//         //         found = true;
//         //         console.log(data[i]);
                
//         //         console.log(data[i]);
//         //         done({
//         //             status: true,
//         //             user: userFound
//         //         });
//         //         break;
//         //     }
//         // }
//         // if (found) {
//         //     done({
//         //         status: true,
//         //         user: userFound
//         //     });
//         // } else {
//         //     done({
//         //         status: false,
//         //         user: null
//         //     });            
//         // }
//     }

//     registerDB(user) {
//         axios.post('https://african-chat-app.firebaseio.com/users.json', user)
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//     }

//     updatePassword(user) {
//         axios.put('https://african-chat-app.firebaseio.com/users/-Lv_fZEcOjPC_SWPIxRA/password.json', user)
//           .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//     }

//     update(users) {
//         this.users = users;
//     }

//     register(user) {
//         let newUser = {
//             id: user.id,
//             email: user.email,
//             password: user.password,
//             info: {
//                 names: user.names,
//                 phone: user.phone,
//                 country: user.phone
//             },
//             friends: [
//                 // {
//                 //     id: 323232,
//                 //     chatId: 12312,
//                 //     chats: [
//                 //         {
//                 //             by: 'me',
//                 //             message: 'hahha i will be there',
//                 //             date: 'date here',
//                 //             status: true,
//                 //             bot: {
//                 //                 state: true
//                 //             }
//                 //         }
//                 //     ]
//                 // }
//             ]
//         };
//     }



















//     addUser(id, name, room) {
//         let user = {id, name, room};
//         this.users.push(user);
//         return user;
//     }

//     getUserList (room) {
//         let users = this.users.filter((user) => user.room === room);
//         let namesArray = users.map((user) => user.name);

//         return namesArray;
//     }

//     getUser(id) {
//         return this.users.filter((user) => user.id === id)[0];
//     }

//     removeUser(id) {
//         let user = this.getUser(id);

//         if (user) {
//             this.users = this.users.filter((user) => user.id != id)
//         }

//         return user;
//     }
// }


// module.exports = {Users};

// // https://fierce-mesa-64195.herokuapp.com/index.html











class Users {
    constructor() {
        this.users = [];
        this.groups = []
    }

    // add users =================================
    addUser(userId, sessionId, groups, callback) {
        // add the user to the users list
        this.users.push({
            id: userId,
            key: sessionId
        });
        for (const key in groups) {
                if (this.groupExist(groups[key])) { // FOUND
                    // ADD USERS TO THE GROUP
                    let selectedGroup = this.searchGroup(groups[key]);
                    if (selectedGroup.found) {
                        // adding the use to the group
                        this.groups[selectedGroup.key].users.push({
                            id: userId,
                            key: sessionId
                        })
                    }
                    
                } else {
                    // create a group
                    let newGroup = {
                        groupId: groups[key],
                        users: []
                    }
                    // add the user to the group
                    newGroup.users.push({
                        id: userId,
                        key: sessionId
                    })
                    // add the created object to the selected groups
                    this.groups.push(newGroup);
                }
            callback(groups[key], userId);
        }
    }

    // search group
    searchGroup(id) {
        for (const key in this.groups) {
            if (this.groups[key].groupId === id) {
                return {
                    found: true,
                    key: key,
                    group: this.groups[key]
                }
                break;
            }
        }
        return {
            found: false
        }
    }

    // check if the user exist ----------------------------
    groupExist(user) {
        // search from sers
        const groupFound = this.groups.some((item) => {
            return item.groupId === user
        });
        return groupFound;
    }

    // return the group copy
    getGroup(id) {
        const selectedGroup = this.groups.find((item) => {
            return item.groupId === id
        })
        return selectedGroup
    }
    
    // callback the user in a certain group
    groupMembers(id, callback) {
        if (this.groupExist(id)) {
            let groups = this.getGroup(id).users;            
            for (const key in groups) {
                callback(groups[key]);
            }
        } 
        return {};
    }

    // check if the user belong in a group
    userExistIn(id, user, type = 'id') {
        const userFound = this.groups[id].users.some((item) => {
            return item[type] === user
        });
        return userFound;
    }

    // return the list of groups the user belongs
    userGroups(userId) {
        let groups = [];
        for (const key in this.groups) {
            if (this.userExistIn(key, userId)) {
                groups.push(this.groups[key].groupId)
            }
        }
        return groups;
    }

    // get users list ============================
    getUserList() {
        return this.users
    }

    getGroupList() {
        return this.groups;
    }

    removeUserList(user, type = 'id') {
        for (const key in this.users) {
            if (this.users[key][type] === user) {
                this.users.splice(key,1)
                break;
            }
        }     
    }

    // remove user ===============================
    removeUser(id, callback, type = 'key') {
        // users.groups[4].users.splice(1,1)
        // let newUsersList
        for (const key in this.groups) {
            for (const x in this.groups[key].users) {
                if (this.groups[key].users[x][type] === id) {
                    let state = false;
                    if (this.groups[key].users.splice(x,1)) {
                        state = true;
                    }

                    if (this.groups[key].users.length <= 1) {
                        callback({
                            state: state, 
                            groupId: this.groups[key].groupId
                        });
                    }
                }
            }
        }
        this.removeUserList(id, type);
        return true;
    }

    // this is the list of the active users =============================
    activeUsers(id, type = 'id') {
        let usersFound = [];
        let groups = this.userGroups(id);
        for (const key in groups) {
            let users = this.getGroup(groups[key]).users;
            for (const x in users) {                
                if (users[x][type] !== id) {
                    usersFound.push(users[x][type])
                }
            }
        }
        return usersFound;
    }

    getUser(id, type = 'id') {
        const foundItem = this.users.find((item) => {
            return item[type] === id
        })
        // console.log(foundItem);
        return foundItem;
    }

}



module.exports = {Users};
