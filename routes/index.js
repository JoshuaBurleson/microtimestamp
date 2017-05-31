const express = require('express');
const fs = require('fs');

var router = express.Router()

router.get('/',function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    fs.readFile('./public/index.html',function(err, data){
        if(err){throw err}
        res.write(data);
        res.end();
    });
});

module.exports = router;