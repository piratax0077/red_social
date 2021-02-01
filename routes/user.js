var express = require('express');
var router = express.Router();
var user = require('../models/user');
var post = require('../models/post');
const City = require('../models/city');
const Friend = require('../models/friend');
const { Op } = require("sequelize");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./public/images'});

function checkAuth(req,res,next){
    if (!req.session.ID) {
        res.send("No esta autorizado para ver esta pagina");
      } else {
        next();
      }
}

router.get('/',checkAuth,function(req,res){
    user.findAll({include:'city'}).then((user) => res.json(user) );
});

router.get('/:id',function(req,res){
    let userId = req.params.id;
    
    user.findOne({include:'city' ,where:{
        id: userId
    }}).then((user) => post.findAll({include:'autor' ,where:{
        autorId: user.id
    }}).then(function(posts){
        getFriends(userId).then(function(friends){
            
            res.render('profile',{user: user, posts: posts, friends: friends})
        })
        
    }) );
});

router.get('/edit/:id',function(req,res){
    let userId = req.params.id;

    user.findOne({where:{
        id: userId
    }}).then(user => {
        City.findAll().then(citys => res.render('signUp',{citys: citys, user: user, title:'Editar usuario'}))
    });
});

router.post('/edit', multipartMiddleware, function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let born = req.body.born;
    let cityId = req.body.cityId;
    let userId = req.body.userId;

    if(req.files){
        var filePath = req.files.avatar.path;
    
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];
        user.update({
            name: name,
            email: email,
            password: password,
            born: born,
            image: fileName,
            cityId: cityId 
        },{
            where:{
                id: userId
            }
        }).then(()=>{
            user.findOne({where:{
                id: userId
            }}).then(user =>{
                getUsers(userId).then(users => {
                    post.findAll({include:['autor','posteos'],order:[['id','DESC']]}).then((posts) => {
                        res.render('index',{user: user, title: 'Bienvenido a mi nuevo mundo', posts: posts, users: users})
                    }).catch(err => console.log(err))
                });
                
            })
            
            
        }).catch(err => console.log(err))
    }else{
        res.json({mensaje:'No Hay foto'})
    }
});

router.get('/publicaciones',function(req,res){
    user.findAll({include:'publicaciones'}).then((user) => res.json(user));
});

function getUsers(id){
  
    return user.findAll({
      include:'city',
      where:{id:{
      [Op.ne] : id
    }}}).then(users => {
      return users;
    }).catch(err => console.log(err))
  }

  function getFriends(id){
      
    return Friend.findAll({include:'emisor',where:{
        
      emisorId:id
    }}).then((friends) => { return friends});
  }
  
  router.delete('/delete',function(req,res){
    let postId = req.body.postId;

    post.destroy({where:{
        id: postId
    }}).then(()=>{
        post.findAll({include:['autor','posteos'],order:[['id','DESC']]}).then((posts) => {
            res.send({posts: posts})
        }).catch(err => console.log(err))
    })
  });

module.exports = router;