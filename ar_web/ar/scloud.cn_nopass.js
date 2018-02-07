var https = require('https')
    ,express = require('express')
    ,app = express()
    ,fs = require("fs");

path = require('path')
app.use('/', express.static(path.join(__dirname, '/')))

var options = {
    key: fs.readFileSync('scloud.cn_nopass.key'),
    cert: fs.readFileSync('scloud.cn_nopass.crt')
};

https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
});
