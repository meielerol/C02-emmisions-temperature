const Pool = require("pg").Pool 

const pool =  new Pool({
    user:"postgres",
    password:"T0nielt1gre",
    database:"climate_change",
    host: "localhost",
    port: 5432
})

module.exports = pool;