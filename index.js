var express 	= require('express'),
	http 		= require('http'),
	socketio	= require('socket.io'),
	bodyParser 	= require('body-parser'),
	path 		= require('path');

var app 	= express();
var server	= http.Server(app);
var io		= socketio(server);

var parseUrlencoded =	 bodyParser.urlencoded({ extend: false });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env', 'developement'); 

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
	console.log('GET /');
	res.render('index.jade', {'title': 'simple todo'});
});

app.post('/', parseUrlencoded, function (req, res) {
	items.push(req.body.item);
	console.log('POST /');
	res.render('index.jade');
});


io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');		
	});

	socket.on('new todo', function (todoContent) {
		io.emit('new todo', todoContent);
		console.log('todoContent to add: ' + todoContent);
	});

	socket.on('rm todo', function(todoToRM) {
		io.emit('rm todo', todoToRM);
		console.log('todoContent to rm: ' + todoToRM);
	});
/*
	socket.on('rm todo', function (todoContent) {
		io.emit('rm todo', function (todoContent) {
			io.emit('rm todo', todoContent);
			console.log('todoContent to rm: ' + todoContent);
		});
	});
*/
});

server.listen(3000, function () {
	console.log('listening on *:3000');
});
