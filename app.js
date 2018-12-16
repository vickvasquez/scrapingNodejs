var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	app = express();

var server = http.createServer(app);
var scrap = require('./scrap');

app.use(bodyParser.json());

app.get('/diputados', function(req,res) {
	res.set("Content-Type", "application/json; charset=utf-8");
	scrap.getDiputadosAll(function(data){
		res.json(data);
	})
});
app.get('/diputado/:id',function(req,res) {
	var id = req.params.id;
	scrap.getDiputado(id,function (data) {
		res.json(data);
	});
})
app.get('/', function(req, res) {
	res.send('Hola bienvenido a diputados');
});

server.listen(3000, function() {
	console.log('server corriendo en el puerto 3000');
});