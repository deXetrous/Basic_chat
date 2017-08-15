/*var express = require('express');
var app = express();
var http = require('http');
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
})

app.listen(port);
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var user = 0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  user++;
});

io.on('connection', function(socket){
  console.log('a user connected id: '+user);

  socket.broadcast.emit('new_user_added',{"userid": user});

  socket.on('disconnect', function(){
  	console.log('user disconnected');
  	socket.broadcast.emit('user_left',{"userid": user});
  });

  socket.on('chat message', function(msg){
  	console.log('message : '+msg);
  	socket.broadcast.emit('chat message', msg);

  });



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});