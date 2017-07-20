let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/public/script.js')
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/public/css/style.css')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let messages = [];
let discon = [];
let usersData=[];
//let users = {};

io.on('connection', function (socket) {
    console.log('Client connected');




    socket.on('user typ', function (data) {
        console.log(data);
        io.emit('user typ', data)
    })

    socket.on('data name', (name) => {
        console.log(name);
        usersData.push(name);
        discon.push((name));
        updateUsers();
        statusss();
        io.emit('data name', name)
    });

    socket.on('user typing',  (msg) =>{
        console.log("Ordered msg: " + msg);
        io.emit('user typing', msg);
        // setTimeout(()=>{msg.value = ""}, 1000)
    });


    socket.on('chat message', (msg) => {
        messages.push(msg);
        console.log(messages);
        io.emit('chat message', msg);
    });
    socket.emit('chat history', messages);

});

function updateUsers() {
    io.emit('users nicknames', usersData);
}
function statusss() {
    let i = discon.status;
    console.log(i)
    io.emit('user status', i);
}

http.listen(5000, () => {
    console.log('listening on:5000')
});

