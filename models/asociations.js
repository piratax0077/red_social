const post = require('./post');
const user = require('./user');
const city = require('./city');
const friend = require('./friend');
const comment = require('./comment');


user.hasMany(post,{as:"publicaciones",foreignKey:"autorId"});

post.belongsTo(user,{as:"autor"});

user.hasMany(friend,{as:'user_emit', foreignKey:"emisorId"});

friend.belongsTo(user,{as:'emisor'});

user.hasMany(friend,{as:"user_receiver", foreignKey:"receptorId"});

friend.belongsTo(user,{as:"receptor"});

user.hasMany(comment,{as:"comentarios",foreignKey:'userId'});

comment.belongsTo(user,{as:'user'});

post.hasMany(comment,{as:'posteos',foreignKey:'postId'});

comment.belongsTo(post,{as:'post'});

city.hasMany(user,{as:"Usuarios", foreignKey:"cityId"});

user.belongsTo(city,{as:"city"});



