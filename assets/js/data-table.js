// import the api database
/*
do later once we figure out how to get the API to work (not just locally)
// import flask API for database connection
const database = "";
*/

// pull from the data.js file?
// let databaseD = ("/data.js");
// console.log('javascript-data', databaseD); //returning the string data.js not the info


/*------------SETTING UP THE MAIN LANDING DATA TABLE------------*/
// import the csv file
const database = "../assets/datasets/cleaned_major_city_temp.csv";
// d3.csv(database).then(data => {
//     console.log('csv data', data);
// });

// headers from table:
// dt, average_temperature, city, country, latitude, longitude

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

/*------------FILTERING ON THE DATA TABLE------------*/
// get the button reference
let btnFilter = d3.select("#filter-btn");
// get the input reference
let form = d3.select("form");   //gets the form div

// set filters equivalent to the data
let inputFilterOptions = [];
d3.csv(database).then(data => {
    // loop through each line individually
    data.forEach(d => {
        // transform the temp, lat, and lon to integers
        // use parseFloat()
        d.average_temperature = parseFloat(d.average_temperature);
        d.latitude = parseFloat(d.latitude);
        d.longitude = parseFloat(d.longitude);
        inputFilterOptions.push(d);
        // console.log(d); //returns the whole row {dt: "", etc.}
    });
    console.log('inputFilterOptions - inside function',inputFilterOptions);
    // console.log('inside length', inputFilterOptions.length);
    // console.log('inside element 0', inputFilterOptions[0]);

});
/*
// javascript runs asynchronously so these don't pull anything because it hasn't finished loading
console.log('outside function', inputFilterOptions);
console.log('outside length', inputFilterOptions.length);
console.log('outside element 0', inputFilterOptions[0]);
*/

// search the filters inputed
function searchFilters() {
    // prevent page from refresh
    d3.event.preventDefault();

    // select input element
    let elementDate = d3.select("#date");
    let elementTemp = d3.select("#temp");
    let elementCity = d3.select("#city");
    let elementCountry = d3.select("#country");
    let elementLat = d3.select("#latitude");
    let elementLon = d3.select("#longitude");
    // get value of input & lovwercase them
    let inputDate = elementDate.property("value");
    let inputTemp = elementTemp.property("value");
    let inputCity = elementCity.property("value").toLowerCase();
    let inputCountry = elementCountry.property("value").toLowerCase();
    let inputLat = elementLat.property("value");
    let inputLon = elementLon.property("value");

    console.log('input temp',inputTemp);
    console.log('input city',inputCity);
    console.log('input lat',inputLat);
    console.log('input lon',inputLon);

    // handle multiiple filters by filtering entries through matching sets in the data
    if (inputDate != "") {
        // console.log(inputFilterOptions.filter(entry => entry.dt === inputDate));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.dt === inputDate);
    }
    if (inputTemp != "") {
        // console.log(inputFilterOptions.filter(entry => entry.average_temperature === parseFloat(inputTemp)));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.average_temperature === parseFloat(inputTemp));
    }
    if (inputCity != "") {
        // console.log(inputFilterOptions.filter(entry => entry.city.toLowerCase() === inputCity));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.city.toLowerCase() === inputCity);
    }
    if (inputCountry != "") {
        // console.log(inputFilterOptions.filter(entry => entry.country.toLowerCase() === inputCountry));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.country.toLowerCase() === inputCountry);
    }
    if (inputLat != "") {
        // console.log(inputFilterOptions.filter(entry => entry.latitude === parseFloat(inputLat)));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.latitude === parseFloat(inputLat));
    }
    if (inputLon != "") {
        // console.log(inputFilterOptions.filter(entry => entry.longitude === parseFloat(inputLon)));
        inputFilterOptions = inputFilterOptions.filter(entry => entry.longitude === parseFloat(inputLon));
    }
    console.log('inputsFiltered',inputFilterOptions);

    // remove existing data from the table
    tbody.html("");
    // recreate with the new filtered items
    inputFilterOptions.forEach(item => {
        // grab the row of the table body
        let row = tbody.append("tr");
        // grab the tableData dictionary entry
        Object.entries(item).forEach(([key,value]) => {
            // append a new table item
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

// because of weird asynchrony:
// call the function when the button is clicked
btnFilter.on("click",searchFilters);
form.on("submit",searchFilters);

/*------------RELOAD THE DATA TABLE------------*/
// handle the when the reset button being clicked
let resetTable = d3.select("#reset-btn");
resetTable.on("click", function() {
    location.reload();
});