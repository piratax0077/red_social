var express = require('express');
var router = express.Router();
var City = require('../models/city');

router.get('/',function(req,res){
    City.findAll({include:'Usuarios'}).then((city) => res.json(city));
});

module.exports = router;