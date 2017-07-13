const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

var upload = multer({dest: 'files/'});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', upload.single('filename'), function(req, res, next) {

    // delete uploaded file
    fs.readdir('./files/', function(err, data) {
        fs.unlink('./files/' + data[0]);
    });

    res.send(JSON.stringify({"size": req.file.size}));

});

app.listen(process.env.PORT);
