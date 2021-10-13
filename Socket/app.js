// var express = require('express');
// var moment = require('moment-timezone');
// var app = express();
// const https = require('https');
// const fs = require('fs');
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// var https_options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/frontend.everybyte.in/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/frontend.everybyte.in/cert.pem"),
//   secure: true
// };
// https.createServer(https_options, app).listen(3002);
// module.exports = { app };
// //server.listen(3001);

// app.get('/', function (req, res) {
//     console.log('socket working Fine ');

//     res.send('Socket working Fine ');
// });
// app.get('/home', function (req, res) {
//     console.log('socket working Fine  home');

//     res.send('Socket working Fine <h1>Hello world</h1> home');
// });

// io.on('connection', function() {
//     console.log('check 2');
// });


// io.on('connection', function (socket) {

//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });

//     /**
//      *
//      * **/
//     socket.on('notification_message',function(data){
//         console.log('notification_message: ',data);
//         io.emit('notification_message',data);
//     });
//     /**
//     * When new order created
//     * **/
//     socket.on('order_message',function(data){
//         console.log('order_message: ',data);
//         io.emit('order_message',data);
//     });
// });



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8089);
console.log('socket Enter Fine Suhail updated');
app.get('/', function (req, res) {
    console.log('socket working Fine Suhail');

    res.send('Socket working Fine Suhail<h1>Hello world Localui</h1>');
});
app.get('/home', function (req, res) {
    console.log('socket working Fine Suhail home');

    res.send('Socket working Fine Suhail<h1>Hello world</h1> home');
});

/*io.on('connection', function() {
    console.log('check 2');
});*/


io.on('connection', function (socket) {
    // console.log('user connected');
    // socket.restaurantId = 27;
    // socket.join(socket.restaurantId);

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('login', function(userId, restaurantId){
        console.log('user login',userId, restaurantId);
        socket.restaurantId = restaurantId;
        socket.userId = userId;
        socket.join(socket.userId);
        socket.join(socket.restaurantId);
    });
    /**
     *
     * **/
    socket.on('notification_message',function(data){
        console.log('notification_message: ',data,'restaurant_id',data.rid);
        socket.restaurantId = data.rid;
        socket.join(socket.restaurantId);
        console.log('socket.restaurantId: ',socket.restaurantId);
        if(io.in(socket.restaurantId).emit('notification_message',data))
            console.log('socket.success.emit: ',socket.restaurantId);
        // io.emit('notification_message',data);
    });
    /**
    * When new order created
    * **/
    socket.on('order_message',function(data){
        console.log('order_message: ',data,'restaurant_id',data.rid);
        socket.restaurantId = data.rid;
        socket.join(socket.restaurantId);
        console.log('socket.restaurantId: ',socket.restaurantId);
        if(io.in(socket.restaurantId).emit('order_message',data))
            console.log('socket.success.emit: ',socket.restaurantId);



        // console.log('order_message: ',data);
        // io.emit('order_message',data);
    });

    /**
    * When trigger beep
    * **/
    socket.on('order_item_beep',function(data){
        console.log('order_item_beep: ',data,'restaurant_id',data.rid);
        socket.restaurantId = data.rid;
        socket.join(socket.restaurantId);
        console.log('socket.restaurantId: ',socket.restaurantId);
        if(io.in(socket.restaurantId).emit('order_item_beep',data))
            console.log('socket.success.emit: ',socket.restaurantId);

        // console.log('order_item_beep: ',data);
        // io.emit('order_item_beep',data);
    });

    /**
     * When serv item update
     * **/
    socket.on('notification_message_serve',function(data){
        console.log('notification_message_serve: ',data,'restaurant_id',data.rid);
        socket.restaurantId = data.rid;
        socket.join(socket.restaurantId);
        console.log('socket.restaurantId: ',socket.restaurantId);
        if(io.in(socket.restaurantId).emit('notification_message_serve',data))
            console.log('socket.success.emit: ',socket.restaurantId);

        // console.log('notification_message_serve: ',data);
        // io.emit('notification_message_serve',data);
    });
});
