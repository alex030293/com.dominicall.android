var express = require('express');
var router = express.Router();

//DAO
var callDAO = require('./../../../lib/model/callDAO');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(501).send('dominicall API :)');
});

//Android endpoint
router.post('/enqueue',  function(req, res) {
    var from = req.body.from;
    var to = req.body.to;
    var userId = req.body.userId;

    global.queue[from] = {
        userId: userId,
        from: from,
        to: to
    };

    (global.queue[from])
    ? res.status(200).send("[ENQUEUED]    "+from+" -> "+ to+" (userId: "+userId+")\n").end()
    : res.status(500).send("[ERROR]    "+from+" -> "+ to+" (userId: "+userId+")\n").end();

});

module.exports = router;

/*
curl -X POST  -H "Content-Type: application/json" -d '{"from": "+34981803995", "to": "+34695562311", "userId":"ajsdasdjas"}' localhost:8000/api/0.1/call/enqueue
*/