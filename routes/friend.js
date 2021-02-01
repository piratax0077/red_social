var express = require('express');
var router = express.Router();
var Friend = require('../models/friend');

router.get('/:id',function(req,res){
    let id_receptor = req.params.id;
    let userId = req.session.ID;
    
    Friend.create({
        sender_id: userId,
        userId: id_receptor
    }).then(function(){
        res.json({mensaje:'Ahora son amigos'})
    }).catch(function(err){
        res.json({mensaje:'Ha ocurrido un error '+err})
    })
});

module.exports = router;