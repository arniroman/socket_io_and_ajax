

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');

let messages = [];
let users = [];
let nickname = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


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



app.get('/messages', function (req, res) {
    res.json(messages);
})

app.post('/messages', function (req,res) {
        console.log(messages)
        messages.push(req.body)
    console.log(messages)
})




app.get('/users', function (req, res) {
    res.json(users);
    console.log(users)
})


app.post('/users', function (req,res) {
        users.push(req.body)
        console.log(users)
})

app.get('/nickname', function (req, res) {
    res.json(users);
    console.log(users)
})

app.post('/nickname', function (req,res) {
    nickname.push(req.body)
    console.log(users)
})


http.listen(5000, function () {
    console.log('listening on 5000');
})