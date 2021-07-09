
$(function(){
   	//make connection
	var socket = io();

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
	
    var myvar;
	//Emit message
	send_message.click(function(){
		
		socket.emit('new_message', {message : message.val()})
		
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		//console.log(data);
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	socket.on("output-messages", (data) => {
		console.log(data);
		if(data.length) {
			data.forEach(message =>{
				if(message.message)
				chatroom.append("<p class='message'>" + message.username + ": " + message.message + "</p>");	
			});	
		}
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
		myvar = window.setInterval(function() {
			var elem = document.getElementById('chatroom');
			elem.scrollTop = elem.scrollHeight;
		  }, 10);
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


