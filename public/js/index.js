/////////////////////////////////////////////////////

let noMessageFoundHTML = '<h1>Be the first to text</h1>';

const e = selector => document.querySelector(selector);
let date = new Date();

const switchClass = (element,firstClass,secondClass,   close = false, duration = 100) => {
    element.classList.remove(firstClass); 
    element.style.opacity = 0;

    setTimeout(() => {
        element.style.opacity = 1;
        if (close) {
            setTimeout(() => element.style.display = 'none', 200);
        }
        element.classList.add(secondClass)
    }, duration);
}

const profile = window.data.root.profile;


const friendSugetion = () => {
    e('#friendListInvite').innerHTML = '';
    for (const i in window.USERS) {
        let user = window.USERS[i];
        let button = '';
        if (i != window.UID) {
            button = `<button onclick="return invite(this, '${i}');">Invite</button>`;
        } else {
            button = '';
        }
        e('#friendListInvite').innerHTML += `
        <div class="friend_item animated" id="user${i}">
        <section class="thumbnail" style="background-image: url('images/profile/profile.png');"></section>
            <section>
                <h4>${user.username}</h4>
                <h3>${user.names}</h3>
            </section>
            ${button}
        </div>`;
    }

    friensInviteHide();
}

const friensInviteHide = () => {
    for (const key in window.FRIENDS_ARRAY) {
            let = item = '#user'+window.FRIENDS_ARRAY[key]+' button';
            e(item).style.display = 'none';
    }    
}


function randomNumber()
{
	var randomnumber;
	randomnumber = Math.random()*399965664399965664;
	return(Math.floor(randomnumber+0.2));
}



const searchSugestFriend = elem => {
    console.log('it is comming in the next version');
    
}

// SHOW APP BAR
const chatList = state => {
    // if (state == 'show') {
    //     e('#chattingContainner').classList.add('show');
    //     e('#chattingContainner').classList.remove('hide');
    // } else {
    //     e('#chattingContainner').classList.add('hide');
    //     e('#chattingContainner').classList.remove('show');        
    // }
}

const chatDetails = state => {
    // if (state == 'show') {
    //     e('#chattingContainnerConteinner').classList.add('show');
    //     e('#chattingContainnerConteinner').classList.remove('hide');
    // } else {
    //     e('#chattingContainnerConteinner').classList.add('hide');
    //     e('#chattingContainnerConteinner').classList.remove('show');        
    // }
}

const pageState = (page, type = 'show', responsive = false) => {
    let state_rem = ''; let state_add = '';
    if (type == 'show') {
        state_rem = 'hide';
        state_add = 'show';
    } else { // hide
        state_rem = 'show';
        state_add = 'hide';
    }

    if (responsive == true) {
        e(page).classList.add(state_add+'_responsive');
        e(page).classList.remove(state_rem+'_responsive');        
    } else {
        e(page).classList.add(state_add);
        e(page).classList.remove(state_rem);
    }
}

const pageState_responsive = (page, type = 'show', option = true) => {
    let state_rem = ''; let state_add = '';
    if (option == true) {
        if (type == 'show') {
            state_rem = 'hide_side_resp';
            state_add = 'show_side_resp';
        } else { // hide
            state_rem = 'show_side_resp';
            state_add = 'hide_side_resp';
        }
    } else {
        if (type == 'show') {
            state_rem = 'hide_main_resp';
            state_add = 'show_main_resp';
        } else { // hide
            state_rem = 'show_main_resp';
            state_add = 'hide_main_resp';
        }
    }

    e(page).classList.remove(state_rem);
    e(page).classList.add(state_add);
}

const SwitchPage = (page) => {
    // hide all the pages
    pageState('#router-container-find-friends','hide');
    pageState('#router-container-chatting','hide');
    pageState('#router-container-posts','hide');
    pageState('#router-container-range','hide');
    pageState('#router-container-profile','hide');
    // stop the animation post
    postBack();

 
    // BUTTON STYLING
    e('.close-app-button').classList.remove('active-bar');
    e('.post-app-button').classList.remove('active-bar');
    e('.chat-app-button').classList.remove('active-bar');
    e('.profile-app-button').classList.remove('active-bar');
    e('#appBar section button').classList.remove('active-bar');
    


    switch (page) {
        case 'chat':
            pageState('#router-container-chatting', 'show');
            pageState('#appBar','show', true);
            e('.chat-app-button').classList.add('active-bar');
            chattList();
            refresh();
            // list the active users

            // xxxxxxxxxx

            break;
        case 'sugestFriend':
            friendSugetion();
            pageState('#router-container-find-friends', 'show');
            pageState('#appBar', 'show', true); 
            break;
        case 'post':
            pageState('#router-container-posts', 'show');
            pageState('#appBar', 'show', true); 
            postList();
            e('.post-app-button').classList.add('active-bar');
            break;
        case 'closse':
            pageState('#router-container-range', 'show');
            pageState('#appBar', 'show', true); 
            e('.close-app-button').classList.add('active-bar');
            break;
        case 'profile':
            pageState('#router-container-profile', 'show');
            pageState('#appBar', 'show', true); 
            e('.profile-app-button').classList.add('active-bar');
            break;

        default:
            break;
    }
}

const Route = page => {
    // hide app pages
    pageState('#appBar','hide', true);

    switch (page) {
        case 'chat':
            // pageState('#chattingContainner', 'show_responsive');
            pageState('#appBar','show', true);
            chattList();
            break;
        case 'chatDetails':
            pageState_responsive('#chattingContainner', 'hide', true);
            pageState_responsive('#chattingContainnerConteinner', 'show');
            e('#chattingContainnerConteinner').classList.remove('hide_main_resp');
            pageState('#appBar', 'hide', true);            
            break;
        case 'chatDetails-back':
            pageState_responsive('#chattingContainner', 'show', true);
            pageState_responsive('#chattingContainnerConteinner', 'hide');
            pageState('#appBar', 'show', true);            
            break;
        case 'sugestFriend':
            pageState('#inviteFriendsContainner', 'show');
            pageState('#appBar', 'show', true);            
            break;
        case 'postDetails':
            pageState_responsive('#postsContainnerConteinner', 'hide', true);
            pageState_responsive('#postDetailsContainnerConteinner', 'show');
            e('#postDetailsContainnerConteinner').classList.remove('hide_main_resp');
            // pageState('#appBar', 'hide', true);
            // pageState('#postsContainnerConteinner', 'show');
            pageState('#appBar', 'show', true); 
            postList();
            break;
        case 'postDetails-back':
            pageState_responsive('#postsContainnerConteinner', 'show', true);
            pageState_responsive('#postDetailsContainnerConteinner', 'hide');
            pageState('#appBar', 'show', true);
            postList();
            break;
        case 'closse':
            pageState('#rangeContainnerConteinner', 'show');
            pageState('#appBar', 'show', true); 
            break;
        case 'profile':
            // pageState('#profileContainnerConteinner', 'show');
            // pageState('#appBar', 'show', true); 
            break;
            
            
        default:
            break;
    }
}

const profileShow = (type = 'me', id = 00) => {
    SwitchPage('profile');

}

// post LIST
const postList = () => {
    let html = '';
    window.postSlide.userPost.max = 0;

    for (var x in window.data.friends) {
        const friend = window.data.friends[x];
        let postNumber = friend.posts.length;
        
        if (postNumber >= 1) {
            window.postSlide.userPost.max = window.postSlide.userPost.max + 1; // users list
            html += `<div class=" friend_item animated openPostSlider" onclick="return openPostee(${x});">
                <section class="thumbnail" style="background-image: url('images/profile/profile.png');"></section>
                <section>
                <h4>${friend.profile.firstName} </h4>
                <h3>${friend.profile.lastName}</h3>
                </section>
                <section>
                    <label class="postNumberSticker">${postNumber}</label>
                <section>
            </div>`;
            e('#postsContainner').innerHTML = html;
        }
    }
}

const openPostee = x => {
    window.postSlide.active = true;
    openPost(x);
}

// post LIST
const openPost = x => {
    const posts = window.data.friends[x].posts;
    window.postSlide.userPost.curent = x;
    window.postSlide.slide.curent = 0;
    window.postSlide.slide.max = posts.length;
    window.data.selected = x;

    let html = '';
    let userSelected = window.data.friends[x];


        // headersinfo
        e('.posts-image-chatting').src = 'images/profile/profile.png';
        e('#post-bar-name-chatting-h2').innerHTML = userSelected.profile.firstName;

    // post website
    let containner = e('#postStateShow');
    let postStateDetails = '';
    let fr = '';
    for (const x in posts) {
        postStateDetails += `<section class="postItem post_${x}">x</section> `;
        fr += ' 1fr';
    }
    let stateHtml = `<div class="" style="display: grid; grid-template-columns: ${fr}; grid-gap: 10px;"> ${postStateDetails} </div>`;
    containner.innerHTML = stateHtml;
    openSlide(posts)
    Route('postDetails');
}

const postBack = () => {
    Route('postDetails-back');
    window.postSlide.active = false;
}

const openSlide = () => {

    let posts = window.data.friends[window.postSlide.userPost.curent].posts;    
    let count = posts.length;
    window.postSlide.slide.max = count;

    console.log('[Courrent slide]: '+window.postSlide.slide.curent+'/'+ window.postSlide.slide.max);
    console.log('[Courrent user]: '+window.postSlide.userPost.curent+'/'+window.postSlide.userPost.max);
  
    // load post
    let currentPost = posts[window.postSlide.slide.curent];
    // console.log('[current post]:' + currentPost);
    console.log(currentPost);
    const html = `
    <section class="slideInRight animated post-contents-center" >
        <img class="image-post" src="${currentPost.image}" />
        <p style="color: #fff; display: block;">${currentPost.caption}</p>
    </section>
    `;

    e('#postContentsPosted').innerHTML = html;
    console.log('[sdsds]:'+window.postSlide.active);
    
    setTimeout(() => {
        // console.log(window.postSlide.slide.curent);
        window.postSlide.slide.curent = window.postSlide.slide.curent + 1;
        // console.log(window.postSlide.slide.curent);
        // next slide
        if (count > window.postSlide.slide.curent) {
            // console.log('next iteration');
            if (window.postSlide.active) {
                openSlide();
            }
            

        } else {
            console.log('the end')
            if (window.postSlide.userPost.max > window.postSlide.userPost.curent) {
                if (window.postSlide.active) {  
                    openPost(window.postSlide.userPost.curent + 1);
                }
            } else {
                console.log(' the end of all users');
            }
        }
    }, 4000);

}


// LOSDING DIV
const loading = state => {
    if (state) {
        console.log('LOADING ***********');
    } else {
        console.log('DONE ***********');
    }
}


// CHATT LIST
const chattList = () => {
    let html = '';
    for (var x in window.USER.oFriends) {
        const friend = window.USER.oFriends[x];

        // friendsListContainner
        html += `
        <div class="friend_item friend_item_chats animated" id="${friend.friendKey}" onclick="return openChatt(this, '${friend.friendKey}', '${friend.groupId}');">
                <section class="thumbnail" style="background-image: url('images/profile/profile.png');">
                        <b class="active-icon active" style="display:none;"></b>
                </section>
                <section>
                    <h4>${friend.details.username}</h4>
                    <h3>${friend.details.names}</h3>
                </section>
                <section class="new-chats" style="display:none;">
                    12
                </section>
        </div>`;
        e('#friendsListContainner').innerHTML = html;
    }
}
// (this, ${friend.friendKey}, ${friend.groupId})
//OPEN THE CHATT USERS
const openChatt = (el, friend, group) => {
    // document.getElementById('chattingContainnerMessages').innerHTML = '<br><br><br><br>⌛ddddd';
    e('.friend_item').style.background = 'transparent';
    e('.friend_item').style.background = 'transparent';
    setTimeout(() => {
        el.style.background = '#5f01012b';
    }, 200)

    let userSelected = window.USERS[friend];
    window.SELECTED_UID = friend;
    window.SELECTED_GROUP = group;


    window.data.selected = friend;
    Route('chatDetails');

    let state = `<section> 
            <b class="active_selected_status_nav">Offline</b> 
            <label class="typing_selected_status_nav"></label>
        </section>`;
    // headersinfo
    e('.profile-image-chatting').src = "images/profile/profile.png";
    e('#bar-name-chatting-h2').innerHTML = userSelected.username + state;

    e('#chattingContainnerMessages').innerHTML = '';
    var objDiv = e('#chattingContainnerMessages');

 
    // console.log('write: ', chat);

    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = objDiv.scrollHeight; }, 100);




    // THE LOADING CHATTS

    if (window.ACTIVE_USERS.includes(window.SELECTED_UID)) {
        e('.active_selected_status_nav').innerHTML = 'Active';
    } else {
        e('.active_selected_status_nav').innerHTML = 'Offline';
    }


    if (window.CHATS.hasOwnProperty(group)) {
        // console.log('the chat has been loaded!');
        // console.log(window.STYLE_CHATS[group]);
        
        if (window.STYLE_CHATS.hasOwnProperty(group)) {
            window.STYLE_CHATS[group].map(chat => {
                writeMessageDOM(chat)
                // console.log('write: ', chat);
            });
        } else {
            e('#chattingContainnerMessages').innerHTML = noMessageFoundHTML;
            
        }

        


    } else {
        loading(true);
        axios.get('https://african-chat-app.firebaseio.com/chats/'+ group +'/chats.json')
        .then((response) => {
            window.CHATS[group] = response.data;
            styleMessages(group, response.data);
            loading(false);
            
            if (window.STYLE_CHATS.hasOwnProperty(group)) {
                window.STYLE_CHATS[group].map(chat => {
                    writeMessageDOM(chat)
                    // console.log('write: ', chat);
                });
            } else {
                console.log('No message found ! hahha');
                
            }
    

        })
        .catch(function (error) {
            loading(false);
        })
    }
    
    // show the typing (text boxex)
    e('#messageInputContainner').style.display = 'block';

}


const writeMessageDOM = message => {
    let = html = '';
    let chatBy = '';
    if (message.by === window.UID) {
        chatBy = 'me';
    } else {
        chatBy = 'friend';
    }

    let date = new Date(message.date);
    let dateFormat = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    let timeFormat = date.getHours()+':'+date.getMinutes();
    // sent image
    let image = '';
    let msgSent = '';
    if (message.image) { 
        image = `
            <section class="image-thumb">
            <img src="${message.image}" />
            </section>`; }

    if (chatBy == 'me') { msgSent = '<svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: auto; margin-bottom: -3px; " width="34.966" height="30.061" viewBox="0 0 34.966 30.061"><path d="M31.453,9.17a2.14,2.14,0,0,0-.284-3.051L27.358,3.035a2.144,2.144,0,0,0-3.014.317L12.675,17.773,7.139,13.106a2.652,2.652,0,0,0-3.585.151L.627,16.183a2.141,2.141,0,0,0,.116,3.136l11.108,9.565a2.139,2.139,0,0,0,3.027-.234Z" transform="translate(1.501 -0.844)" fill="#fff" stroke="#3a0202" stroke-width="3"/></svg>'; }

    e('#chattingContainnerMessages').innerHTML += `
    <div class="chat-separator">s</div>
    <div class="message ${chatBy}">
    <div class="chatt-containner">
        <section>${message.msg}</section>
        ${image}
        <section class="time-section"> ${msgSent}  ${dateFormat} - <b>${timeFormat}</b></section>
        </div>
    </div>
    `;


        // // sent image
        // let image = '';
        // let msgSent = '';
        // if (chat.image) { 
        //     image = `
        //         <section class="image-thumb">
        //         <img src="${chat.image}" />
        //         </section>`; }
        // if (chat.by == 'me') { msgSent = '<svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: auto; margin-bottom: -3px; " width="34.966" height="30.061" viewBox="0 0 34.966 30.061"><path d="M31.453,9.17a2.14,2.14,0,0,0-.284-3.051L27.358,3.035a2.144,2.144,0,0,0-3.014.317L12.675,17.773,7.139,13.106a2.652,2.652,0,0,0-3.585.151L.627,16.183a2.141,2.141,0,0,0,.116,3.136l11.108,9.565a2.139,2.139,0,0,0,3.027-.234Z" transform="translate(1.501 -0.844)" fill="#fff" stroke="#3a0202" stroke-width="3"/></svg>'; }

        // e('#chattingContainnerMessages').innerHTML += `
        // <div class="chat-separator">s</div>
        // <div class="message ${chat.by}">
        // <div class="chatt-containner">
        //     <section>${chat.msg}</section>
        //     ${image}
        //     <section class="time-section"> ${msgSent}  ${chat.date.date} - <b>${chat.date.time}</b></section>
        //     </div>
        // </div>
        // `;

    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = e('#chattingContainnerMessages').scrollHeight; }, 100);

}


// root.profile.email
const invite = (el, code) => {
    switchClass(el.parentElement,'x','zoomOut', true);
    inviteFriendDB(code);
}





// e('#friendsContinueButton').onclick = () => Route('chat');
// e('#registerButton').onclick = () => register();

 
window.onload = (event) => {
            switchClass(e('#mainContentsContainner'), 'fade', 'fadeInRight');
            e('#mainContentsContainner').style.display = 'block';
    // checkRegistration();
    // friendSugetion();

    e('#mainContentsContainner').style.display = 'block';
            Route('sugestFriend');
} 



function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;
  
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    //   requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }


setTimeout(() => { 
    toggleFullScreen();
}, 5000);





 



const sendMessage = (msg, by) => {
    let socketMEssage = {
        by: window.UID,
        msg: msg,
        date: date,
        group: window.SELECTED_GROUP
    };

    

    // // send message with socket
    // console.log('sender: ', socket.id);
    // console.log('sender: ', window.socket.id);
    
 

    // window.socket.emit('sendMessage', socketMEssage, function(err) {
    //     // console.log(err);
        
    //     // if (err) {
    //     //     alert(err);
    //     //     window.location.href = '/';
    //     // } else {
    //     //     console.log('there is no error');
            
    //     // }
    // });

    window.socket.emit('createMessage', socketMEssage, function (data) {
        console.log('data found');
    });


    // insert the message in an object
    let userId = window.UID;
    let dateFormat = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    let timeFormat = date.getHours()+':'+date.getMinutes();
    
    let randomId = 'elementChat'+randomNumber();
    let sentIcon = '<svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: auto; margin-bottom: -3px; " width="34.966" height="30.061" viewBox="0 0 34.966 30.061"><path d="M31.453,9.17a2.14,2.14,0,0,0-.284-3.051L27.358,3.035a2.144,2.144,0,0,0-3.014.317L12.675,17.773,7.139,13.106a2.652,2.652,0,0,0-3.585.151L.627,16.183a2.141,2.141,0,0,0,.116,3.136l11.108,9.565a2.139,2.139,0,0,0,3.027-.234Z" transform="translate(1.501 -0.844)" fill="#fff" stroke="#3a0202" stroke-width="3"/></svg>';
    // add html
    // let time = '32323';
    e('#chattingContainnerMessages').innerHTML += `
    <div class="chat-separator">s</div>
    <div class="message zoomInUp animated ${by}">
        <div class="chatt-containner">
            <section>${msg}</section>
            <section class="time-section"> 
            <b id='${randomId}'>   </b>
            ${dateFormat} - <b>${timeFormat}</b></section>
        </div>
    </div>`;

    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = e('#chattingContainnerMessages').scrollHeight; }, 100);
    setTimeout(() => { e('#chattingContainnerMessages').lastElementChild.classList.remove('zoomInUp');}, 3000);

    let message = {
        by: window.UID,
        msg: msg,
        date: date
    };


    // PUSH THE MESSAGE TO THE SERVER
    loading(true);
    axios.post('https://african-chat-app.firebaseio.com/chats/'+ window.SELECTED_GROUP +'/chats.json', message)
    .then((response) => {
        // // handle success
        message.key = response.data.name;
        storeMessage(message);

        // set the sent icon
        if (e("#chattingContainnerMessages").contains(e('#'+randomId))) {
            e('#'+randomId).innerHTML = sentIcon;
        }
    })


}

const chattBoot = (message) => {
    setTimeout(() => {
        message = message.toLowerCase();
        let replly = '';
        if (message == 'group list') {
            replly = 'Group Menber: <br> <b>218004581</b> Janvier <br>  <b>218004581</b> Janvier <br> <b>218004581</b> Janvier <br>  <b>218004581</b> Janvier <br>';
        } else if (message == 'thanks') {
            replly = 'You are welcome.';
        } else if (message == 'hello') {
            replly = 'Hello how are you?.';
        } else if (message == 'im fine' || message == 'fine' ) {
            replly = 'Good!';
        } else {
            replly = 'Thank you for contacting Me! <br> i will reply you when i get back online!';
        }


        // sending message
        if (replly !== '') { sendMessage(replly, 'friend'); }
        
    }, 3000);
}


e('#sendMessageButton').onclick = () => {
    const text = e('#messageInputText').value;

    sendMessage(text, 'me');
    e('#messageInputText').value = '';
    // chattBoot(text);
}


const usersGroups = () => {
    let foundGroups = [];
    let users = Object.keys(window.USER.friends);
    
    for (const key in users) {
        foundGroups.push(window.USER.friends[users[key]].groupId)
    }
    return foundGroups;
}
















const Sound = (type = 'notification') => {
    if (type == 'notification') {
        e('#notification-sound').play();
    } else {
        e('#message-sound').play();
    }
}



// load data
window.onload = (event) => {


    if (sessionStorage.getItem("uid") === '') {
        window.location.href = '/';
    } else {
        window.UID = sessionStorage.getItem("uid");
        loadMainData(data => {
            // console.log('data: ', data);
            findId(sessionStorage.getItem("uid"), user => {
                window.USER = user;
                generateFriendsList(user);
                chattList();
                // console.log('FIRENDS GROUPS: ', window.FRIENDS_GROUPS_ARRAY);
                // console.log('GROUPS GROUPS: ', window.FRIENDS_ARRAY);
                
                // console.log('users list: ',window.USER.friends);
                // console.log('organized friends: ', window.USER.oFriends);
                // console.log('the doctors');
                
                
            });

            

            if (window.page === 'chat' && window.socket === null) {
                window.socket = io();

                startSocketsOperations();
                // let socket = io();
                // console.log('>_ socket created.');
                
            }
            
            // console.log('connecting to the server: ', window.socket);
            // START THE SOCKET PROCESS
            window.socket.on('connect', function () {
                console.log('Connected to the server');
            
                let joinData = {
                    uid: window.UID,
                    groups: usersGroups()
                };

                window.socket.emit('join', joinData, function(err) {
                    // console.log('responce from the server: ', err);
                })
            });
        });
    }
};

















// // inboxMessage
// socket.on('inboxMessage', (message) => {
//     console.log('INBOX MESSAGE: ', message);
// });



// // new message
// socket.on('newMessage', function (message) {
//     console.log('newMessage: ', message);
//     // const formattedTime = moment(message.createdAt).format('LT');
//     // // let li = document.createElement('li');
//     // // li.innerText = `${message.from} - ${formattedTime}: ${message.text}`;

//     // // document.querySelector('body').appendChild(li);

//     // const template = document.querySelector('#message-template').innerHTML;
//     // const html = Mustache.render(template, {
//     //     from: message.from,
//     //     text: message.text,
//     //     createdAt: formattedTime
//     // });

//     // const div = document.createElement('div');
//     // div.innerHTML = html;
//     // document.querySelector('#messages').append(div);
//     // scrollToBottom();
// });

// WORKING WITH CHATTS
const addToList = (data, list = window.ACTIVE_USERS) => {
    if (!list.includes(data)) {
        list.push(data);
    }
};

// REMOVE USER TO THE LIST
const removeToList = (x, list = window.ACTIVE_USERS) => {
    const itemNames = list.filter((item) => {
        return item !== x
    })
    window.ACTIVE_USERS = itemNames; 
}



// DOM Active users
const activeChatDOM = (id, type) => {
    if (type == 'active') {
        e(`#friendsListContainner #${id} .thumbnail .active-icon`).style.display = 'block';
    } else {
        e(`#friendsListContainner #${id} .thumbnail .active-icon`).style.display = 'none';
    }

    // active the navigation on the dom
    if (window.SELECTED_UID !== '') {
        if (id === window.SELECTED_UID) {
            if (type == 'active') {
                e('.active_selected_status_nav').innerHTML = 'Active';
            } else {
                e('.active_selected_status_nav').innerHTML = 'Offline';
            }
        }
    }
}


window.typing = false;


// emmiting the socket
const typingState = () => {
    console.log('TYPING STSTE: ', window.typing);
    let typing = {
        groupId: window.SELECTED_GROUP,
        userId: window.SELECTED_UID,
        state: window.typing,
        value: e('#messageInputText').value
    }

    // console.log(e('#messageInputText').value);
    
    window.socket.emit('typing', typing);
}


// THE TYPING MESSAGE

// start tyoing

e('#messageInputContainner').addEventListener('keyup', () => {
    window.typing = true;
    typingState();

    // setTimeout(() => {
    //     if (window.typing === true) {
    //         window.typing = false;
    //         typingState();
    //     }
    // }, 6000);
})


e('#messageInputContainner').addEventListener('focusout', () => {
    // window.typing = true;
    // typingState();

    // setTimeout(() => {
    //     if (window.typing === true) {
            window.typing = false;
            typingState();
        // }
    // }, 6000);
})


// stoped typinng
const closeNotification = (elem) => {
    elem.parentElement.style.display = 'none'
}



const alertMesage = message => {    
    let id = randomNumber();

    let elem = `
    <section>
    <section class="nofitication-item fadeInDownBig animated ${id}_elem" id="${id}_elem">
    <button class="close" onclick="return closeNotification(this);">x</button>
    <b>${message.user}</b>
    <p>${message.message}</p>
    </section>
    `;
    let node = document.createElement("section");  
    node.innerHTML = elem;

    e('#notificationPopUpBar').appendChild(node);

    setTimeout(() => {
        document.getElementById(id+'_elem').classList.remove('fadeInDownBig');
        document.getElementById(id+'_elem').classList.add('flipOutX');

        setTimeout(() => {
            document.getElementById(id+'_elem').style.display = 'none';
        }, 900);
    }, 4000);
}




// **************************************************************************************************
const startSocketsOperations = () => {
    // new message
    window.socket.on('newMessage', function (message) {
        // create the sound
        if (message.group === window.SELECTED_GROUP && message.by !== window.UID) {
            // pust the message the 
            console.log('the dom is selected');
            
            writeMessageDOM(message);
            Sound('m');
            
        } else {
            if (message.by !== undefined) {
                
                alertMesage({
                    user: window.USERS[message.by].names,
                    message: message.msg,
                    id: '',
                    group: ''
                })
            }
            Sound();
            // put the element to the ui dom
            console.log('the dom is not selected');   
        }
    });
    
    
    
    // new message
    window.socket.on('updateUserList', function (message) {
        
        // console.log('UPDATED CHATT LIST CHATT LIST *********************************************');
        // console.log(message);
        
        // scrollToBottom();
    });
    
    

    // new message LIST OF  CONNECTED USERS
    window.socket.on('activeUsers', function (activeUsers) {
        
        // console.log('ACTIVE USERS CHATT LIST *********************************************');
        for (const key in activeUsers) {
            // console.log(activeUsers[key]);
            
            addToList(activeUsers[key])
            activeChatDOM(activeUsers[key], 'active')
        }
        console.log(activeUsers);
        console.log(window.ACTIVE_USERS);
        // scrollToBottom();
    });

    window.socket.on('aConnectedUser', function (user) {
        console.log('A CONNECTED USER: ', user);
        addToList(user);
        activeChatDOM(user, 'active');
    });


    window.socket.on('adDisconnectedUser', function (user) {
        removeToList(user.id);
        activeChatDOM(user.id, 'deactive');
    });
        
    
const createTypingElement = text => {
    let element  = `
        <div class="chat-separator">s</div>
        <div class="message friend" id="typingLiveElementShow_div" style="font-size: 18px;background: #f78e10;text-shadow: 0px 0px 20px #000;">
        <div class="chatt-containner">
            <section class="plainText">${text}</section>
            <section class="time-section">Now</section>
            </div>
        </div>    
    `;

    // check if the element exist
    let parrent = e('#chattingContainnerMessages');
    if (parrent.contains(e('#typingLiveElementShow_div'))) {
        // it contain the message boc
        e('#typingLiveElementShow_div .plainText').innerHTML = text;
    } else {
        parrent.innerHTML += element;
    }

    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = e('#chattingContainnerMessages').scrollHeight; }, 100);

}


const removeTypingElement = () => {
    let elem = document.getElementById("typingLiveElementShow_div");
        elem.parentNode.removeChild(elem);
}



    socket.on('trpingBack', function(typing) {
        // check if the user is selected
        let elementId = 'typingLiveElementShow';


        // SHOW THE TYPING
        
        // WORK WITH THE TYPING MESSAGE
        if (typing.groupId === window.SELECTED_GROUP) {
            // check if the element is in the dom
            if (typing.state) {
                createTypingElement(typing.value);
            } else {
                removeTypingElement();
            }

        } else {
            console.log('active -- herer');
            
        }
        console.log(typing);
        // socket.broadcast.to(groupId).emit('trpingBack', typing);
        
    });



    
    // disconnected
    window.socket.on('disconnect', function () {
        console.log('disonnected to the server');
    });
    
    
}