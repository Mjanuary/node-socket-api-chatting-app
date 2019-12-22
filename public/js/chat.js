
let socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');

    let params = window.location.search.substring(1)
    let paramsURL = JSON.parse('{"' + decodeURI(params).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g, '":"') + '"}');
    // let paramsURL = '{"' + decodeURI(params).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g, '":"') + '"}';
    console.log(paramsURL);
    
    socket.emit('join', paramsURL, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('there is no error');
            
        }
    })


    // socket.emit('createMessage', {
    //     from: "WDJ",
    //     text: "whats going on!"
    // })
});


// 





// new message
socket.on('newMessage', function (message) {
    // console.log('newMessage: ', message);
    const formattedTime = moment(message.createdAt).format('LT');
    // let li = document.createElement('li');
    // li.innerText = `${message.from} - ${formattedTime}: ${message.text}`;

    // document.querySelector('body').appendChild(li);

    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#messages').append(div);
    scrollToBottom();
});

// new message
socket.on('newLocationMessage', function (message) {
    console.log('newLocationMessage: ', message);
    const formattedTime = moment(message.createdAt).format('LT');

    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    a.innerHTML = 'My Curent Location';

    li.appendChild(a);
    console.log(a);
    document.querySelector('body').appendChild(li);






    // const template = document.querySelector('#message-template').innerHTML;
    // const html = Mustache.render(template, {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: formattedTime
    // });

    // const div = document.createElement('div');
    // div.innerHTML = html;
    // document.querySelector('#messages').append(div);
    scrollToBottom();
});








// new message
socket.on('updateUserList', function (message) {
    // console.log('newMessage: ', message);
    // const formattedTime = moment(message.createdAt).format('LT');
    // let li = document.createElement('li');
    // li.innerText = `${message.from} - ${formattedTime}: ${message.text}`;

    // document.querySelector('body').appendChild(li);

    // const template = document.querySelector('#message-template').innerHTML;
    // const html = Mustache.render(template, {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: formattedTime
    // });

    // const div = document.createElement('div');
    // div.innerHTML = html;
    // document.querySelector('#messages').append(div);
    // scrollToBottom();

    console.log('the active users:');
    console.log(message);
    
    
});






// disconnected
socket.on('disconnect', function () {
    console.log('disonnected to the server');
});


// socket.on('updateUsersList', function (data) {
//     console.log('users list: ', data);
// });


// Anknowlegment
// socket.emit('createMessage', {
//     from: 'John',
//     text: 'Hey'
// }, function (message) {
//     console.log(message);
// });


document.querySelector('#submit-btn').addEventListener('click', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('input[name="message"]').value
    }, function (data) {
        console.log('data found');
        
    });
    
});


document.querySelector('#send-location').addEventListener('click', function (e) {
    // check the location support
    if (!navigator.geolocation) {
        alert('Geo location is not suported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, function(data) {
            console.log('Location found!', data);
            
        });

        // console.log({
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        // });
        
    }, function(data) {
        alert('Unable Fetch location');
    })
});

// auto scrolling
function scrollToBottom() {
    let messages = document.querySelector('#messages').lastElementChild;
    messages.scrollIntoView();
}