const express = require('express');
const app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'));


app.listen('https://cinema-tickets-back.herokuapp.com/', function () {
  console.log('!');
});