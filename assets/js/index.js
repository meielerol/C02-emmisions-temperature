const express = require("express")
const app = express()
const pool = require("./db")

app.use(express.json())



app.get("/todos", async(req,res)=>{
 try {
     const allCleanData =  await pool.query("select * from cleaned_global_land_temperatures_by_major_city WHERE extract(month from dt) = '8' and city IN ('Paris','Taipei','Saint Petersburg','Sydney','New York') order by dt asc");
     res.setHeader("Access-Control-Allow-Origin","*")
     res.json(allCleanData.rows)
} catch (error) {
     console.log(error.message)
 }
})


app.listen(5000, () => {
     console.log("server is listening to port 5000")
})