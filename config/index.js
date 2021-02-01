require("dotenv").config();
 
 var database = {
    name:process.env.DB_NAME,
    host:process.env.DB_SERVER,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD
}

module.exports = database;