/*
var restify = require('restify');

function respond (req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();

server.get('/hello/:name', respond);

*/
var express = require('express');
var app = express();

var Twit = require('twit');
var T = new Twit(require('./config.js'));
var restclient = require('node-restclient');
var markov = require('markov');
var m = markov(1);

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
    response.send(m.fill(m.pick(), 2).join(' '));
})

var beers = {};
restclient.get('http://api.brewerydb.com/v2/beers/?key=9149d3bb6685a717143de335cbc68fcc&styleId=3', function(res) { beers = JSON.parse(res); seedMarkov() });
function seedMarkov() {
    var names = '';
    beers.data.forEach(function (d) {
        names += d.name + ' ';
    });
    m.seed(names);
}

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
