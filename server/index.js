//Arduino serial Comms
// const { SerialPort } = require('serialport')
// const { ReadlineParser } = require('@serialport/parser-readline')
// const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })

// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
// // parser.on('data', console.log)
// parser.on('data', (line) =>{
//     //Data read
//     console.log('Arduino dice: ' + line)
//     //Data write
//     port.write('Era una vez ')
// })

var http = require('http');
var fs = require('fs');
const { parseArgs } = require('util');

var index = fs.readFileSync("../views/index.html")

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

var app = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function(socket){
    // console.log('Node is listening to port');
    socket.on('lights', function(data){
        // console.log(data);  
        // port.write(data.status);  
        port.write(data.value);
    });
    
    socket.on('analog', function(data){
        // console.log(data);
        // port.write(data.status);
        port.write(data.value);
    });
});

parser.on('data', function(line){
    console.log(line); 
    // io.emit('data', data);
});

// app.listen((process.env.PORT || 8080),"10.50.94.169", () =>{
//     console.log("Server started on http://10.50.94.169:8080") 
// });

app.listen((process.env.PORT || 8080),"192.168.68.122", () =>{
    console.log("Server started on http://192.168.68.122:8080") 
});