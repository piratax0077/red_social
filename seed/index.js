const User = require('../models/user');
const City = require('../models/city');
const Post = require('../models/post');
const Friend = require('../models/friend');
const Comment = require('../models/comment');
const { sequelize } = require('../models/post');
const comment = require('../models/comment');


const citys = [
    {name:'Coquimbo', region:'IV', population: 235000},
    {name:'Santiago', region:'M', population: 1200000},
    {name:'Valparaiso', region:'V', population: 370000},
    {name:'Puerto Monttt', region:'X',population: 240000}
]

const users = [
    {name:'Francisco', email:'fco@gmail.com',password:'fr31', born: '1989/04/20', cityId: 1},
    {name:'Javiera', email:'javiera@gmail.com',password:'jr24', born: '1997/02/19', cityId: 2},
    {name:'Camila', email:'camila@gmail.com',password:'ca32', born: '1989/04/15', cityId: 3},
    {name:'Alejandra', email:'ale@gmail.com',password:'ac36', born: '1989/05/20', cityId: 2}
];

const posts = [
    {title:'Hola mundo', body:'Primer saludo desde NodeJs', userId: 1},
    {title:'Hola mundo 2', body:'2 saludo desde NodeJs', userId: 2},
    {title:'Hola mundo 3', body:'3 saludo desde NodeJs', userId: 3},
    {title:'Que almorzaremos', body:'veremos algunas opciones', userId: 2}
]

const comments =[
    {description:'Buena foto', postId: 1},
    {description:'Hey! dode andas? llamame', postId: 3},
    {description:'Hey! dode andas? te vamos a buscar', postId: 2}
]

sequelize.sync({force:false}).then(()=>{
    console.log('conexion establecida');
}).then(()=>{
    citys.forEach((city)=> City.create(city));
}).then(()=>{
    users.forEach((user) => User.create(user) );
}).then(()=>{
    posts.forEach((post) => Post.create(post));
}).then(()=>{
    comments.forEach((comment) => Comment.create(comment));
})








