var express = require("express");
var app = express();
var port = 3070;
var sanitize = require('validator').sanitize;

app.set('views', __dirname + '/design');
app.set('view engine', "jade");
 app.engine('jade', require('jade').__express);
app.get("/", function(request, response){
    response.render("page");
}); 


app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function (socket) {
	console.log("someone is online");
    socket.emit('message', { message: 'Novanet Chatzone <a style="color:#f8f5ef">  Enter your Name to begin </a>' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
console.log("Listening on port " + port);
