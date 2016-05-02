var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PORT = 3000; //avoid ports between 1-1234, use 3000, and 8080

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.listen(PORT, function(){
   console.log('app is listening on port ' + PORT);
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});
app.get('/survey.html', function(req, res) {
    res.sendFile(__dirname + '/tables.html');
});
