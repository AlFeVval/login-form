const http = require('http');
const express = require('express');
let app = express();
app.use(express.static('./src')); //__dir and not _dir
let port = 8080; // you can use any port
app.listen(port);
console.log('server on: ' + port);
