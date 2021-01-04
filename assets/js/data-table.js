// import the api database
/*
do later once we figure out how to get the API to work (not just locally)
// import flask API for database connection
const database = "";
*/

// import the csv file
const database = "../assets/datasets/cleaned_major_city_temp.csv";
d3.csv(database).then(data => {
    console.log(data);
});

/*
headers from table:
dt, average_temperature, city, country, latitude, longitude
*/

// define the table body
let tbody = d3.select("tbody");
// get each array item
d3.csv(database).then(data => {
    data.forEach((item) => {
        // get the row of the table body
        let row = tbody.append("tr");
        // grab the data entry
        Object.entries(item).forEach(([key,value]) => {
            // append a new table item
            let cell = row.append("td");
            cell.text(value);
        });
    });
});