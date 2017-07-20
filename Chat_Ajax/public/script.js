


(function () {

    // let loginForm = document.getElementById('login__form');
   // let submitBtn = document.getElementById('login__btn');

    let nickName = document.getElementById('NickName');
    let sendBoxBtn = document.getElementById('sendbox__btn');
    let sendBoxInput = document.getElementById('sendbox__input');
    let board = document.getElementById('Content__list');
    let usersList = document.getElementById('user__list');
    let modal = document.getElementById('myModal');
    let status = document.querySelector('#satus');
    let userBtn = document.getElementById('SubmitName');
    let userName = document.getElementById('Name');
    let userItem = document.getElementsByClassName('user__item')
    let online =  document.getElementsByClassName('online')



    window.addEventListener('load', function(){
        modal.style.display = 'block';
    });


    let socket = io.connect();


    userBtn.onclick = function (event) {
        event.preventDefault();
        let nameValue = {
            name: userName.value,
            nickNames: '@'+nickName.value
        };


        modal.style.display = 'none';

        ajaxRequest({
            method: 'POST',
            url: "/users",
            data: nameValue
        })

    };


    sendBoxBtn.onclick = function (event) {
        event.preventDefault();
        let dataa = {
            text: sendBoxInput.value,
            nameVal: userName.value,
            nickNamess: nickName.value
        };
        sendBoxInput.value = '';
        console.log(dataa);

        ajaxRequest({
            method: 'POST',
            url: "/messages",
            data: dataa
        })
    };

        var ajaxRequest = function(options){
            var url = options.url || '/';
            var method = options.method || 'GET';
            var callback = options.callback || function () {};
            var data = options.data || {};
            var xmlHttp = new XMLHttpRequest()

            xmlHttp.open(method, url, true);
            xmlHttp.setRequestHeader('Content-Type', 'application/json');
            xmlHttp.send(JSON.stringify(data));

            xmlHttp.onreadystatechange = function () {
                if(xmlHttp.status == 200 && xmlHttp.readyState === 4){
                    callback(xmlHttp.responseText);
                }
            };
        };

    var  getUsers = function () {
        ajaxRequest({
            url:'/users',
            method: 'GET',
            callback: function (msg) {
                console.log(msg)

                msg = JSON.parse(msg);

                console.log(msg)
                usersList.innerHTML = '';
                for(var i in msg){
                    if(msg.hasOwnProperty(i)){
                        var ele = document.createElement('li');
                        ele.innerText=msg[i].name +'@'+ msg[i].nickNames;
                        usersList.appendChild(ele);
                    }
                }
            }
        })
    }



    var  getData = function () {
            ajaxRequest({
                url:'/messages',
                method: 'GET',
                callback: function (msg) {
                    console.log(msg)
                    msg = JSON.parse(msg);
                    board.innerHTML = '';
                    for(var i in msg){
                        if(msg.hasOwnProperty(i)){
                            var el = document.createElement('li');
                            el.innerText=msg[i].nameVal +'@'+ msg[i].nickNamess +': '+ msg[i].text;
                            board.appendChild(el);
                        }
                    }
                }
            })
        }
        getData();
        getUsers();


        setInterval(function () {
            getData()
            getUsers()
        },1000);



})();



