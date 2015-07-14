var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('dominicall API :)');
});

//Android endpoint
router.post('/android',  function(req, res) {
    res.end(200, "Hue!");
});

module.exports = router;
