var express = require('express');
var router = express.Router();
var config = require('./api/0.1/config');

// Configure appplication routes

//Remove globals, send number in post
var fromNumber;

router.get('/', function(request, response) {
    response.render('index', {title: "hue"});
});

// Handle an AJAX POST request to place an outbound call
router.post('/call', function(request, response) {
    fromNumber = request.body.From;
    var from = request.body.From;
    var to = request.body.To;

    if(global.queue[from]){
        console.log("[QUEUE]    found call in queue:");
        console.log(global.queue[from]);
        var queueTo = global.queue[from].to;
        try{
            global.queue[from] = undefined;
        }catch(e){
            console.log(e);
        }
        console.log('[CALL] - ' + from + ' -> ' + queueTo);
        response.send('<?xml version="1.0" encoding="UTF-8"?><Response><Dial timeout="20" record="false" callerId="'+from+'">'+ queueTo +'</Dial></Response>');
    }else {

        console.log('[CALL] - ' + from + ' -> ' + to);
        var res = "";

        //international forwarding
        if (to === "+34911980567") {
            res = ('<?xml version="1.0" encoding="UTF-8"?><Response><Dial timeout="20" record="false" callerId="+18299479006">+18299226595</Dial></Response>');
        } else if (to === "+18299479006") {
            res = ('<?xml version="1.0" encoding="UTF-8"?><Response><Dial timeout="20" record="false" callerId="+18299479006">+34603847010</Dial></Response>');
        } else if (config.whitelist.indexOf(from) > -1) {
            //read number.
            res = ('<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/makecall" numDigits="13" timeout="20"><Say voice="woman" language="es-es">Marca el número de teléfono al que quieres llamar con su código de país.</Say></Gather></Response>');
        } else {
            res = ('<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="woman" language="es-es">No puedes hacer llamadas desde este número.</Say></Response>');
        }

        response.send(res);
    }

});

// Return TwiML instuctions for the outbound call
router.post('/makecall', function(request, response) {
    console.log(request.body.Digits);
    console.log("Got " + request.body.Digits.length + " digits.");
    if(request.body.Digits.length < 12){
        console.log("Not enough, repeat");
        response.send('<?xml version="1.0" encoding="UTF-8"?><Response><Gather action="/makecall" numDigits="13" timeout="20"><Say voice="woman" language="es-es">El número no es válido. Marca el número de teléfono al que quieres llamar con su código de país.</Say></Gather></Response>');
    }else{
        response.send('<?xml version="1.0" encoding="UTF-8"?><Response><Dial timeout="20" record="false" callerId="'+fromNumber+'">'+request.body.Digits+'</Dial></Response>');
    }
});

module.exports = router;