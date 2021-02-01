const express = require('express')
const app = express()
const port = 3000

const sequelize = require('./database/db');
const { Op } = require("sequelize");
const post = require('./models/post');
const user = require('./models/user');
const city = require('./models/city');
const friend = require('./models/friend');
const comment = require('./models/comment');

var session = require("express-session");
var path = require("path");
var multipart = require('connect-multiparty');
const { get } = require('https');
var multipartMiddleware = multipart({uploadDir:'./public/images'});
require('./models/asociations');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    key: "app.sess",
    secret: "SUPERsekret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

// Rutas
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/citys', require('./routes/city'));
app.use('/api/friends', require('./routes/friend'));

// Rutas assets

app.use('/styles',express.static(__dirname +'/public/css/styles.css'));
app.use('/css', express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/jquery.min.js'));
app.use('/fas',express.static(__dirname+'/node_modules/font-awesome/css/font-awesome.min.css'));
app.use('/images',express.static(__dirname+'/public/images'));

app.get('/', (req, res) => {
  
  res.render('login');
});


app.post('/index',function(req,res){
  let email = req.body.email;
  let password = req.body.password;


  user.findOne({attributes:['name','email','id','image'], where:{email: email,password: password}}).then(user => {
    if(!user || user == ''){
      res.render('error');
    }else{
      getUsers(user.id).then(users => 
        post.findAll({include:['user','comentarios']}).then(function(posts){
          getFriends(user.id).then(friends => {
           
            if(users.length > 0){
              req.session.ID = user.id;
              
              res.render('index',{user:user,title:'Bienvenido a mi nuevo mundo',posts: posts, users: users,friends: friends});
            }else{
              res.json({mensaje:'No existen mas usuarios'});
            }
          });
        
         
      }));
      
      
    }
    
  }).catch(function(err){
      console.log(err);
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
    return friend.findAll({include:'user',where:{
      sender_id:id
    }}).then((friends) => {return friends});
  }

});

app.get('/signUp',function(req,res){
  city.findAll().then(citys => res.render('signup',{citys: citys, title:'Registrar nuevo usuario', user:''}) )
  
});

app.post('/signUp', multipartMiddleware ,function(req,res){
  let name = req.body.name;
  let email = req.body.email;
  let date = req.body.date;
  let pass = req.body.password;
  let ciudadId= req.body.ciudadId;

  if(req.files){
    var filePath = req.files.avatar.path;
    
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[2];

    user.create({name:name,email: email, password: pass, born: date, image: fileName, cityId: ciudadId}).then(()=>{ res.redirect('/') });
  }else{
    console.log('No se han subido archivos')
  }

});

// Ruta de prueba
app.get('/prueba',function(req,res){
  comment.findAll({include:['post']}).then(users =>{
    res.json(users);
  }).catch((err)=>{
    res.json(err);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

sequelize.sync({force: false}).then(()=>{
    console.log("Conexión exitosa");
}).catch((err) =>{
    console.log(err);
})