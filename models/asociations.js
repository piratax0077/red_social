const post = require('./post');
const user = require('./user');
const city = require('./city');
const friend = require('./friend');
const comment = require('./comment');

user.hasMany(post,{as:"publicaciones",foreignKey:"userId"});

post.belongsTo(user,{as:"user"});

city.hasMany(user,{as:"Usuarios", foreignKey:"cityId"});

user.belongsTo(city,{as:"city"});

user.hasMany(friend,{as:'amigos', foreignKey:"userId"});

friend.belongsTo(user,{as:'user'});

post.hasMany(comment,{as:"comentarios", foreignKey:'postId' });

comment.belongsTo(post,{as:'post'});

