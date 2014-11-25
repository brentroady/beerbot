var express = require('express');
var app = express();

var Twit = require('twit');
var T = new Twit(require('./config.js'));

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


var styles = require('./styles');
var adjuncts = require('./adjuncts');
var hops = require('./hops');

function CreateSomethingNew() {

    var MAX_LENGTH = 140;
    var len = 141;
    var something = '';

    while (len > MAX_LENGTH) {

        var style = styles[Math.floor(Math.random() * styles.length)].name;
        var adjunct = adjuncts[Math.floor(Math.random() * adjuncts.length)].name;
        var hop = hops[Math.floor(Math.random() * hops.length)].name;

        something = style + ' with ' + adjunct + ' and ' + hop + ' hops';
        len = something.length;

        console.log(something + '; length: ' + len);
    }

    return something;
}

function tweet() {

    var newbeer = CreateSomethingNew();

    T.post('statuses/update', { status: newbeer }, function(err, reply) {
        if (err) {
            console.log('error:', err);
        }
        else {
            console.log('reply:', reply);
        }
    });
}

tweet();

setInterval(function() {
    try {
        tweet();
    }
    catch (e) {
        console.error(e);
    }

}, 1000 * 60 * 60);

app.get('/', function (request, response) {
    response.send(CreateSomethingNew());
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
