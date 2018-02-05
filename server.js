var express = require('express');
var app = express();

app.use('/', express.static('./'));
app.use(function(req,res,next){//处理404
	res.status(404).send("Sorry cant not find that!");
});
app.use(function(err, req, res, next) {//处理服务端错误
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', function (req, res) {
  // res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:3000');
});