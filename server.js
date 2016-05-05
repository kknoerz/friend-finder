var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var PORT = 3000; //avoid ports between 1-1234, use 3000, and 8080
var mysql = require('mysql');
// var routes = require('./app/public/survey.html');

var app = express();
var userArray = [];

var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  database  : 'friendFinderDB'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.listen(PORT, function(){
   console.log('app is listening on port ' + PORT);
})

// app.use('/app/friends', routes);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/public/home.html');
});

app.get('/survey', function(req, res) {
    res.sendFile(__dirname + '/app/public/survey.html');
});

app.post('/api/friends', function(req, res){
  var newUser = req.body;
  console.log('This is new user scores: ', newUser.scores);
  var scores = newUser.scores.join();
  var currentUsers = [];
  connection.query('SELECT id, name, scores, photo FROM users', function(err, result){
    if (err) throw err;

    for (var i = 0; i < result.length; i++) {

      console.log('These are all ids ',result[i].id);
      var loopUsers = {
        'id': result[i].id,
        'name': result[i].name,
        'photo': result[i].photo
      }
      var scoreString = result[i].scores;
      var scoreInt = scoreString.replace(/,/g,'')
      var scoreArray = [];
      for(j=0;j<scoreInt.length;j++){
        scoreArray.push(parseInt(scoreInt[j]))
      }

      loopUsers.scores = scoreArray;
      currentUsers.push(loopUsers);
      console.log(currentUsers);
    }

  });

  for (k=0;k<currentUsers.length;k++){

  }


  // connection.query('INSERT INTO users(name, photo, scores) VALUES("'+newUser.name+'", "'+newUser.photo+'", "'+scores+'");', function(err, result){
  //   if(err) throw err;
  //   console.log('This is result: ',result);
  // })
});

app.get('/api', function(req, res){
  connection.query('select * from users', function(err, result){
    if(err) throw err;

    var html = '<ol>'

    for (var i = 0; i < result.length; i++) {
      html += '<li><p> ID: ' + result[i].id + '</p>';
      html += '<p>Name: ' + result[i].name + ' </p></li>';
      html += '<p>photo: ' + result[i].photo + ' </p></li>';
      html += '<p>scores: ' + result[i].scores + ' </p></li>';
    };

    html += '</ul>'

    res.send(html)
  })
});

// app.get('/api/friends', function(req, res){
//   connection.query('select * from users', function(err, result){
//     console.log('result ', result);
//     res.render(result);
//   });
// });

// app.get('/api/friends', function(req,res){
//   console.log('This is response ', res.body);
// });
