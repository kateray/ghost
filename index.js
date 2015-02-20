//Requirements
var express = require('express'),
sassMiddleware = require('node-sass-middleware');
var path = require('path');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(
	sassMiddleware({
		src: 'sass/',
		dest: 'public/styles',
		debug: true,
		outputStyle: 'compressed',
		prefix:  '/styles'
	})
);

app.use(express.static(__dirname + '/public'));

var fs = require("fs"),
		json;

function readJsonFileSync(filepath, encoding){

		if (typeof (encoding) == 'undefined'){
				encoding = 'utf8';
		}
		var file = fs.readFileSync(filepath, encoding);
		return JSON.parse(file);
}

function getConfig(file){

		var filepath = __dirname + '/' + file;
		return readJsonFileSync(filepath);
}

var data = getConfig('data.json');

var getRand = function() {
	var matches = data['text'].match(/([A-Za-z'\s\d-,]+)\.\s\s/g);
	var rand = Math.floor(Math.random() * matches.length);
	return matches[rand];
};

var getSentence = function() {
	var sentence = getRand();
	if ( sentence.match(/^(\s-)+/) ) {
		sentence = sentence.match(/^(\s-)+(.+)/)[2];
	}
	if ( sentence.match(/^(\s')+/) ) {
		sentence = sentence.match(/^(\s')+(.+)/)[2];
	}
	//eliminate short sentences
	console.log(sentence.match(/(\s)/g).length);
	while ( sentence.match(/(\s)/g).length < 5 || sentence.match(/^[a-z]/) ) {
		sentence = getRand();
	}
	return sentence;
};

app.get('/n', function(req, res) {
	res.send(getSentence());
});

app.get('/', function(req, res) {
	return res.render('home', {
		sentence: getSentence()
	});
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
	var host = server.address().address;
	console.log('ghost app listening at http://%s:%s', host, port);
});
