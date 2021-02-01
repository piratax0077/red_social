var express = require('express');
var router = express.Router();
var post = require('../models/post');
var user = require('../models/user');

function checkAuth(req,res,next){
    if (!req.session.ID) {
        res.send("No esta autorizado para ver esta pagina");
      } else {
        next();
      }
}

router.get('/',checkAuth,function(req,res){
    post.findAll({include:'user'}).then((user) => res.json(user));
});

router.post('/add',function(req,res){
    let titulo = req.body.title;
    let cuerpo = req.body.body;
    let userId = req.body.userId;


    post.create({title: titulo, body: cuerpo, autorId: userId}).then((post) => {
        user.findByPk(userId).then((user) => {
            let imagen = JSON.stringify(user.image);
            console.log(imagen);
            res.status(200).send({user: user, post: post})
        })
    });
});

module.exports = router;