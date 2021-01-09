const Pool = require("pg").Pool 

const pool =  new Pool({
    user:Postgres_User,
    password:Postgres_Password,
    database:"climate_change",
    host: "localhost",
    port: 5432
})

module.exports = pool;