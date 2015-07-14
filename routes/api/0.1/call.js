var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('dominicall API :)');
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

    console.log(global.queue);
    res.send("[ENQUEUED]    "+from+" -> "+ to+" (userId: "+userId+")\n").end();
});

module.exports = router;

/*
curl -X POST  -H "Content-Type: application/json" -d '{"from": "+34981803995", "to": "+34695562311", "userId":"ajsdasdjas"}' localhost:8000/api/0.1/call/enqueue
*/