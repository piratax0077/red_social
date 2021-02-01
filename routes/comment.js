var express = require('express');
var router = express.Router();
var comment = require('../models/comment');
var session = require("express-session");

router.get('/',function(req,res){
  res.json({mensaje:'Hola, soy comentarios'})
});

router.post('/add',function(req,res){
    let postId = req.body.postId;
    let comment_post = req.body.comment;
    let userId = req.session.ID;
    comment.create({
        description: comment_post,
        userId: userId,
        postId: postId
    }).then((comment)=>{
        res.send({comment: comment});
    })
});

module.exports = router;