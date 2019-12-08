const e = selector => document.querySelector(selector);





// let socket = io();
// socket.on('connect', function () {
//     console.log('Connected to the server');


//     // socket.emit('createMessage', {
//     //     from: "WDJ",
//     //     text: "whats going on!"
//     // })
// });



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const coverChange = () => {
    setInterval(() => {
        let bg = getRndInteger(1, 5);
        var el = e('.image-section');
        el.style.backgroundImage = `url(images/cover${bg}.jpg)`;
    }, 4000);
}

coverChange();


// inputs cleanning
const cleanning = () => {
    setTimeout(() => { 
        e('#login-alerts').innerHTML = '';
        e('#register-alerts').innerHTML = '';

        // clearing the form
        e('#loginEmail').style.borderColor = '#3a0202';
        e('#loginPassword').style.borderColor = '#3a0202';

        // register cleaning
        e('#registerEmail').style.borderColor = '#3a0202';
        e('#regidterPassword').style.borderColor = '#3a0202';
        e('#regidterRePassword').style.borderColor = '#3a0202';
        e('#regidterPhone').style.borderColor = '#3a0202';
        e('#regidterNames').style.borderColor = '#3a0202';
        e('#regidterUsername').style.borderColor = '#3a0202';
        e('#regidterCountry').style.borderColor = '#3a0202';


        e('#registerEmail_Label').innerHTML = '';
        e('#regidterPassword_Label').innerHTML = '';
        e('#regidterRePassword_Label').innerHTML = '';
        e('#regidterPhone_Label').innerHTML = '';
        e('#regidterNames_Label').innerHTML = '';
        e('#regidterUsername_Label').innerHTML = '';
        e('#regidterCountry_Label').innerHTML = '';
        console.log('cleaning...');
        
    }, 5000);
}

const alerts = (body, cat = 'login', type = 'danger shake') => {
    let el = '';
    if (cat == 'login') {
        el = e('#login-alerts');
    } else {
        el = e('#register-alerts');
    }

    el.innerHTML = `<section class="alert ${type}  animated"> ${body} </section>`;
    cleanning();
}

/////////////////////////////////////// REGISTER // 

e('#switch-register').addEventListener('click', () => {
    e('#login-form-containner').style.display = 'none';
    e('#register-form-containner').style.display = 'block';
});

e('#switch-login').addEventListener('click', () => {
    e('#login-form-containner').style.display = 'block';
    e('#register-form-containner').style.display = 'none';
});



const findDB = (key,value, success) => {
    let data = window.DB;
    let found = false;
    for (const i in data) {
        let newOBJ = data[i];
        if (data[i][key] == value) {
            found = true;
            success(true);
            break;
        }

    }
    if (!found) {
        success(false);
    }

}


/////////////////////////////////////// REGISTER // 
////// REGISTER - VALIDATION //
e('#registerButton').addEventListener('click', () => {
        cleanning();
        let email = e('#registerEmail');
        let email_label = e('#registerEmail_Label');

        let password = e('#regidterPassword');
        let password_label = e('#regidterPassword_Label');

        let passwordRe = e('#regidterRePassword');
        let passwordRe_label = e('#regidterRePassword_Label');

        let phone = e('#regidterPhone');
        let phone_label = e('#regidterPhone_Label');

        let username = e('#regidterUsername');
        let username_label = e('#regidterUsername_Label');

        let names = e('#regidterNames');
        let names_label = e('#regidterNames_Label');

        let country = e('#regidterCountry');
        let country_label = e('#regidterCountry_Label');


        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passformat = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
        var namesformat = /^[A-Za-z ]+$/;

    if (email.value == '') {
        email.style.borderColor = 'red';
        email_label.innerHTML = 'Please enter the email!';
    } 
    // check the if is the email
    else if (!email.value.match(mailformat)) {
        email_label.innerHTML = 'Your email is incorrect!';
        email.style.borderColor = 'red';
    }

    // PHONE NUMBER VALIDATION
    else if (username.value.length == '') {
        username_label.innerHTML = 'Your username number must not be empty!';
        username.style.borderColor = 'red';
    }

    // PHONE NUMBER VALIDATION
    else if (username.value.length < 6) {
        username_label.innerHTML = 'your username must not be less than 6 characters!';
        username.style.borderColor = 'red';
    }

    // PASSWORD VALIDATION
    else if (password.value == '') {
        password_label.innerHTML = 'Please enter the password!';
        password.style.borderColor = 'red';
    }
    
    // PASSWORD VALIDATION
    else if (password.value.length < 6) {
        password_label.innerHTML = 'Your password must not be less than 6 characters!';
        password.style.borderColor = 'red';
    }

    // PASSWORD VALIDATION
    else if (password.value.length >= 21) {
        password_label.innerHTML = 'Your password must not be greater than 20 characters!';
        password.style.borderColor = 'red';
    }

    // check the if is the email
    else if (!password.value.match(passformat)) {
        password_label.innerHTML = `
            Your password must contain: <br> 
             - one character! <br>
             - one number! <br>
             - one symbol! 
            `;
        password.style.borderColor = 'red';
    }

    // PASSWORD VALIDATION
    else if (password.value.length !== passwordRe.value.length) {
        passwordRe_label.innerHTML = 'This password must match the previous ☝️';
        passwordRe.style.borderColor = 'red';
    }

    // PHONE NUMBER VALIDATION
    else if (phone.value.length == '') {
        phone_label.innerHTML = 'Your phone number must not be empty!';
        phone.style.borderColor = 'red';
    }

    // PHONE NUMBER VALIDATION
    else if (phone.value.length > 14) {
        phone_label.innerHTML = 'Your phone must not be less than 6 NUMBERS!';
        phone.style.borderColor = 'red';
    }


    // PHONE NUMBER VALIDATION
    else if (names.value.length == '') {
        names_label.innerHTML = 'Your names must not be empty!';
        names.style.borderColor = 'red';
    }

    // PHONE NUMBER VALIDATION
    else if (!names.value.match(namesformat)) {
        names_label.innerHTML = 'Your names must not contain a number or a symbol!';
        names.style.borderColor = 'red';
    }


    // PHONE NUMBER VALIDATION
    else if (country.value == '') {
        country_label.innerHTML = 'Select a country!';
        country.style.borderColor = 'red';
    }


    else {
        // start the lofin process
        let credentials = {
            email: email.value,
            password: password.value,
            phone: phone.value,
            username: username.value,
            names: names.value,
            country: country.value
        }

        console.log('searching...');
        
        findDB('email', credentials.email, (res) => {
            if (res != true) {
                findDB('username', credentials.username, (res2) => {
                    if (res2 != true) {
                        
                        // console.log('everything is fine');
                        axios.post('https://african-chat-app.firebaseio.com/users.json', credentials)
                        .then(function (response) {
                            // console.log(response);
                            e('#login-form-containner').style.display = 'block';
                            e('#register-form-containner').style.display = 'none';
                            alerts('Account Created Successfully<br>Now you can login','login','success zoomIn')
                        })
                        .catch(function (error) {
                            console.log(error);
                        });                        

                    } else {
                        username_label.innerHTML = `<u>${credentials.username}</u> is already in use by another user<br> try another username.`;
                        username.style.borderColor = 'red';
                        cleanning();
                    }
                });
            } else {
                email.style.borderColor = 'red';
                email_label.innerHTML = `<u>${credentials.email}</u> is already in use by another user<br> try another email.`;
                cleanning();
            }
        });
        
    }
});









/////////////////////////////////////// REGISTER
e('#loginButton').addEventListener('click', () => {
    let email = e('#loginEmail');
    let password = e('#loginPassword');
    if (email.value == '') {
        alerts('Please enter the email!');
        email.style.borderColor = 'red';
    } else if (password.value == '') {
        alerts('Please enter the password!');
        password.style.borderColor = 'red';
    } else {
        // start the lofin process
        let crd = {
            email: email.value,
            password: password.value
        }
        
   
        let data = window.DB;
        let found = false;
        for (const i in data) {
            let newOBJ = data[i];
            if (data[i].password == crd.password && data[i].email == crd.email) {
                found = true;

                sessionStorage.setItem("uid", i);
                e(".body-body").classList.add('body-success');

                setTimeout(() => {
                    window.location.href = '/chat.html';
                }, 1000);
                break;
            }

        }
        if (!found) {
            alerts('incorect username or password!');
        }


    }
});



function loadData() {
    axios.get('https://african-chat-app.firebaseio.com/users.json')
    .then((response) => {
        // handle success
        window.DB = response.data;
        e(".body-body").classList.remove('body-success');
    })
    .catch(function (error) {
        
    })
    .finally(function () {

    });     
}


loadData();
window.onload = (event) => {
    if (sessionStorage.getItem("uid") !== '') {
        window.location.href = '/chat.html';
    }
};







