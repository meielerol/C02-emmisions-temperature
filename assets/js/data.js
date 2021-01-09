const {Pool, Client} = require('pg')
const connectionString = `postgressql://${Postgres_User}:${Postgres_Password}@localhost:5432/climate_change`

const client = new Client({
    connectionString: connectionString,
})

client.connect()

client.query('SELECT * FROM cleaned_global_land_temperatures_by_major_city', (err, res)=>{
    console.log(err, res)
    client.end()
})