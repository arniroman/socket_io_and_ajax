
(function () {

    let nickName = document.getElementById('NickName');
    let sendBoxBtn = document.getElementById('sendbox__btn');
    let sendBoxInput = document.getElementById('sendbox__input');
    let Content__list = document.getElementById('Content__list');
    let usersList = document.getElementById('user__list');
    let modal = document.getElementById('myModal');
   // let status = document.querySelector('#satus');
    let userBtn = document.getElementById('SubmitName');
    let userName = document.getElementById('Name');
   // let userItem = document.getElementsByClassName('user__item');
    let online =  document.getElementById('online');
    let userTyping =  document.getElementById('user__typing');

    window.addEventListener('load', function(){
        modal.style.display = 'block';
    });

    let socket = io.connect();

    userBtn.onclick = function (event) {
        event.preventDefault();
        let nameValue = {
            name: userName.value,
            nickNames: '@'+nickName.value,
            status: " : online"
        };



        modal.style.display = 'none';
        socket.emit('data name', nameValue);
    };




    sendBoxBtn.onclick = function (event) {
        event.preventDefault();
        let message = {
            text: sendBoxInput.value,
            nameVal: userName.value,
            nickNamess: '@'+nickName.value
        };
        sendBoxInput.value = '';
        console.log(message);
        socket.emit('chat message', message);
    };

    sendBoxInput.addEventListener('keyup', () =>  {
        let msg = sendBoxInput.value ;
        socket.emit('user typ', msg);
    });




    sendBoxInput.addEventListener('keyup', () =>  {
        let msg =  userName.value + " is typing ...";
        socket.emit('user typing', msg);
    });


    socket.on('user typing', function (text) {
        console.log(text);
        userTyping.value = text;
        setTimeout(()=>{userTyping.value = ""}, 1000)
    });

    socket.on('chat message', function (msg) {
        //console.log(msg.nickNamess)
        let sa = msg.nickNamess
        if(msg.text === "@"+ msg.nickNamess){
           sa.style.color ="red";
         }
    })

    socket.on('chat message', function (msg) {
        let boardItem = document.createElement('li');
        boardItem.innerText = msg.nameVal + msg.nickNamess+ ": " + msg.text ;
        boardItem.className = 'board__item';
        Content__list.appendChild(boardItem);
    });



    socket.on('users nicknames', (data) => {
        console.log(data);
        console.log(usersList.children);
        let ul = [...usersList.children];
        console.log(ul);
        ul.forEach((el) => {
            el.remove()
        });
        data.forEach((user) => {
            let userItem = document.createElement('li');
            let name = document.createElement('span');
            let nick = document.createElement('span');
            let status = document.createElement('span');

            userItem.className = 'user__item';
            nick.className = 'user__nick';
            name.className = 'user__name';
            status.className = 'user__status';

            name.innerHTML = user.name;
            nick.innerHTML = user.nickNames;
            status.innerHTML = user.status;



            userItem.appendChild(name);
            userItem.appendChild(nick);
            userItem.appendChild(status);

            usersList.appendChild(userItem);
        })


    })






})();



