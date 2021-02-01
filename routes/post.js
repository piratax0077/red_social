var express = require('express');
var router = express.Router();
var post = require('../models/post');

router.get('/',function(req,res){
    post.findAll({include:'user'}).then((user) => res.json(user));
});

router.post('/add',function(req,res){
    let titulo = req.body.title;
    let cuerpo = req.body.body;
    let userId = req.body.userId;


    post.create({title: titulo, body: cuerpo, userId: userId}).then((post) => res.send(post));
});

module.exports = router;