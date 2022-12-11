const express = require('express');
const app = express();
const http = require('http');
const socketIO = require("socket.io");

let server = http.createServer(app);
const io = socketIO(server);
// const fs = require('fs');
// var index = fs.readFileSync("../views/index.html")

app.use(express.static('public'))

var sp = require('serialport');

var port = new sp('/dev/ttyACM0',{
    baudRate: 9600, dataBits: 8,
    parity: 'none', stopBits: 1,
    flowControl: false 
})

const parsers = sp.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});

port.pipe(parser);

io.on('connection', function(socket){
    console.log('Node is listening to port');
    socket.on('pickPlace', function(data){
        // console.log(data);  
        // port.write(data.status);  
        port.write(data.value);
    });
    
    socket.on('analogx', function(data){
        // console.log(data);
        // port.write(data.status);
        port.write(data.value);
    });
    socket.on('analogy', function(data){
        // console.log(data);
        // port.write(data.status);
        port.write(data.value);
    });
});

parser.on('data', function(line){
    console.log(line); 
    // io.emit('data', data);
});

server.listen((process.env.PORT || 8080),"10.50.81.57", () =>{
    console.log("Server started on http://10.50.81.57:8080") 
});
// server.listen((process.env.PORT || 8080),"192.168.68.122", () =>{
//     console.log("Server started on http://192.168.68.122:8080") 
// });