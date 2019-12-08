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

console.log(window.app);
console.log(window.data);

const profile = window.data.root.profile;

// prompt checkRegistration
const checkRegistration = () => {
    console.log(window.app.state.isRegistered);
    if (window.app.state.isRegistered == false) {        
        // check if the user has logged in
        if (profile.email == '') {
            e('#register').style.display = 'block';
            e('#mainContentsContainner').style.display = 'none';

        }
    }
}
const validate = (element, rules) => {
    // console.log(rules);
    return true;    
}

// const register = () => {
//     if (
//         validate('#registerEmail','email') &&
//         validate('#regidterFName','text') &&
//         validate('#regidterLName','text') &&
//         validate('#regidterPhone','number') &&
//         validate('#regidterCountry','text')
//     ) {
//             profile.email = e('#registerEmail').value;
//             profile.firstName = e('#regidterFName').value;
//             profile.lastName = e('#regidterLName').value;
//             profile.phone = e('#regidterPhone').value;
//             profile.country = e('#regidterCountry').value;

//             switchClass(e('#register'), 'fadeInRight', 'fadeOutLeft', true);
//             // switchClass(e('#mainContentsContainner'), 'fade', 'fadeInRight');
//             e('#mainContentsContainner').style.display = 'block';
//             Route('sugestFriend');
//             // e('#register').style.display = 'none';

//             friendSugetion();
//     }
// }

const friendSugetion = () => {
    let html = '';
    window.data.friends.map(friend => {
        // console.log(friend);
        html += `<div class="friend_item animated">
        <section class="thumbnail" style="background-image: url('images/profile/${friend.profile.picture}');"></section>
            <section>
                <h4>${friend.profile.firstName}</h4>
                <h3>${friend.profile.lastName}</h3>
            </section>
            <button onclick="return invite(this);">Invite</button>
        </div>`;
    e('#friendListInvite').innerHTML = html;
    })
}

// SHOW APP BAR
// const appBar = state => {
//     if (state == 'show') {
//         e('#appBar').classList.add('show');
//         e('#appBar').classList.remove('hide');
//     } else {
//         e('#appBar').classList.add('hide');
//         e('#appBar').classList.remove('show');        
//     }
// }

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
            break;
        case 'sugestFriend':
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
    // 
    // pageState('#register','hide');
    // pageState('#inviteFriendsContainner','hide');
    // pageState('#chattingContainnerConteinner','hide');
    // pageState('#chattingContainner','hide_responsive');
    
    // pageState('#postsContainnerConteinner','hide');
    // pageState('#postDetailsContainnerConteinner','hide');
    
    // pageState('#rangeContainnerConteinner','hide');
    // pageState('#profileContainnerConteinner','hide');
    
    // app bar
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
                <section class="thumbnail" style="background-image: url('images/profile/${friend.profile.picture}');"></section>
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
        e('.posts-image-chatting').src = 'images/profile/'+userSelected.profile.picture;
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

// e('.openPostSlider').onclick = () => {window.postSlide.active = true; }
// e('.stopPostAnimation').onclick = () => 

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


// CHATT LIST
const chattList = () => {
    let html = '';
    for (var x in window.data.friends) {
        const friend = window.data.friends[x];
        // console.log(friend);
        html += `
        <div class="friend_item friend_item_chats animated" onclick="return openChatt(${x});">
                <section class="thumbnail" style="background-image: url('images/profile/${friend.profile.picture}');">
                        <b class="active-icon active"></b>
                </section>
                <section>
                    <h4>${friend.profile.firstName}</h4>
                    <h3>${friend.profile.lastName}</h3>
                </section>
                <section class="new-chats">
                    12
                </section>
        </div>`;
        e('#friendsListContainner').innerHTML = html;
    }
}

//OPEN THE CHATT USERS
const openChatt = user => {
    let userSelected = window.data.friends[user];
    window.data.selected = user;
    Route('chatDetails');

    let state = `<section> <b>Active</b> <label>Typing...</label></section>`;
    // headersinfo
    e('.profile-image-chatting').src = 'images/profile/'+userSelected.profile.picture;
    e('#bar-name-chatting-h2').innerHTML = userSelected.profile.firstName + state;

    e('#chattingContainnerMessages').innerHTML = '';
    var objDiv = e('#chattingContainnerMessages');

    let = html = '';
    window.data.friends[user].chats.map(chat => {
        // sent image
        let image = '';
        let msgSent = '';
        if (chat.image) { 
            image = `
                <section class="image-thumb">
                <img src="${chat.image}" />
                </section>`; }
        if (chat.by == 'me') { msgSent = '<svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: auto; margin-bottom: -3px; " width="34.966" height="30.061" viewBox="0 0 34.966 30.061"><path d="M31.453,9.17a2.14,2.14,0,0,0-.284-3.051L27.358,3.035a2.144,2.144,0,0,0-3.014.317L12.675,17.773,7.139,13.106a2.652,2.652,0,0,0-3.585.151L.627,16.183a2.141,2.141,0,0,0,.116,3.136l11.108,9.565a2.139,2.139,0,0,0,3.027-.234Z" transform="translate(1.501 -0.844)" fill="#fff" stroke="#3a0202" stroke-width="3"/></svg>'; }

        e('#chattingContainnerMessages').innerHTML += `
        <div class="chat-separator">s</div>
        <div class="message ${chat.by}">
        <div class="chatt-containner">
            <section>${chat.msg}</section>
            ${image}
            <section class="time-section"> ${msgSent}  ${chat.date.date} - <b>${chat.date.time}</b></section>
            </div>
        </div>
        `;
    });

    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = objDiv.scrollHeight; }, 100);

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




// root.profile.email
const invite = el => {
    switchClass(el.parentElement,'x','zoomOut', true);
}

e('#sendMessageButton').onclick = () => {
    const text = e('#messageInputText').value;

    sendMessage(text, 'me');
    e('#messageInputText').value = '';
    chattBoot(text);
}

const sendMessage = (msg, by) => {
    // insert the message in an object
    let userId = window.data.selected;
    let userChats  = window.data.friends[userId].chats;
    let dateFormat = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    let timeFormat = date.getHours()+':'+date.getMinutes();
    
    // add html
    let time = '32323';
    e('#chattingContainnerMessages').innerHTML += `
    <div class="chat-separator">s</div>
    <div class="message zoomInUp animated ${by}">
        <div class="chatt-containner">
            <section>${msg}</section>
            <section class="time-section"> 
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: auto; margin-bottom: -3px; " width="34.966" height="30.061" viewBox="0 0 34.966 30.061"><path d="M31.453,9.17a2.14,2.14,0,0,0-.284-3.051L27.358,3.035a2.144,2.144,0,0,0-3.014.317L12.675,17.773,7.139,13.106a2.652,2.652,0,0,0-3.585.151L.627,16.183a2.141,2.141,0,0,0,.116,3.136l11.108,9.565a2.139,2.139,0,0,0,3.027-.234Z" transform="translate(1.501 -0.844)" fill="#fff" stroke="#3a0202" stroke-width="3"/></svg>            ${dateFormat} - <b>${timeFormat}</b></section>
        </div>
    </div>`;
    setTimeout(() => { e('#chattingContainnerMessages').scrollTop = e('#chattingContainnerMessages').scrollHeight; }, 100);
    setTimeout(() => { e('#chattingContainnerMessages').lastElementChild.classList.remove('zoomInUp');}, 3000);

    let message = {
        by: by,
        msg: msg,
        date: {
            date: dateFormat,
            time: timeFormat
        }
    };
    userChats.push(message); 
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