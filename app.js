require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Chat = require("./models/Chat");


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//Database connection

const MONGODB_URI = process.env.MONGO_URI;

const connect = mongoose.connect(MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true });
connect.then(
    (db) => {
      console.log("Database Connected Successfully");
    },
    (err) => {
      console.log("Error occur while connecting ", err);
    }
  );


//routes
app.get('/', (req, res) => {
	res.render('index')
})

const PORT = process.env.PORT || 3000;

server = app.listen(PORT);

//socket.io instantiation
const io = require("socket.io")(server)


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
