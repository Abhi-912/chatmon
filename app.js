const express = require('express');
const app = express();


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)

//Database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected');

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })
    
    Chat.find().then(data => {
        socket.emit('output-messages', data);
    })
    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        if(data.message !== '')
        io.sockets.emit('new_message', {message : data.message, username : socket.username});

        connect.then(db => {
            console.log("connected correctly to the server");
            let chatMessage = new Chat({ message: data.message, username: socket.username });
      
            chatMessage.save();
          });
    });

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
})
