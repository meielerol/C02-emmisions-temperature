// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  PRE_INDUSTRIAL_REV: new L.LayerGroup(),
  INDUSTRIAL_REV: new L.LayerGroup(),
  PRE_EPA: new L.LayerGroup(),
  CURRENT: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [40.52, 34.34],
  zoom: 2.3,
  layers: [
    layers.PRE_INDUSTRIAL_REV,
    layers.INDUSTRIAL_REV,
    layers.PRE_EPA,
    layers.CURRENT,
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Pre Industrial Revolution": layers.PRE_INDUSTRIAL_REV,
  "1st Industrial Revolution": layers.INDUSTRIAL_REV,
  "Pre EPA Regulations": layers.PRE_EPA,
  "Current Day": layers.CURRENT,
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  PRE_INDUSTRIAL_REV: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "LightGreen",
    markerColor: "LightGreen",
    shape: "star"
  }),
  INDUSTRIAL_REV: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "Green",
    markerColor: "Green",
    shape: "circle"
  }),
  PRE_EPA: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "Yellow",
    markerColor: "Yellow",
    shape: "penta"
  }),
  CURRENT: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "Red",
    markerColor: "Red",
    shape: "circle"
  }),
};

// d3.csv("major_city_temp.csv").then(function (data) {
//     console.log(data)

//     });
var dataset = "../assets/datasets/major_city_temp.csv"

d3.csv(dataset, function(response) {

    // L.geoJson(response).addTo(myMap);
    // console.log(response);

    var i;
    var data;
    var lon;
    var lat;
    var date;
    for(i=0; i<response.length; i++){
      data=response[i];
      
      lon = data.longitude;
      lat = data.latitude;
      date = data.dt;
      // Do whatever you want with lon and lat here

    


    // latitude = response.latitude
    // longitude = response.longitude

// data.forEach(function (data) {
//         data.longitude = longitude
//         data.latitude = latitude


    // L.geoJson(response).addTo(myMap);
    // console.log(response);
// Perform an API call to the Citi Bike Station Information endpoint
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", function(infoRes) {

//   // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
//   d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", function(statusRes) {
//     var updatedAt = infoRes.last_updated;
//     var stationStatus = statusRes.data.stations;
//     var stationInfo = infoRes.data.stations;

//     // Create an object to keep of the number of markers in each layer
//     var stationCount = {
//       PRE_INDUSTRIAL_REV: 0,
//       INDUSTRIAL_REV: 0,
//       PRE_EPA: 0,
//       CURRENT: 0,
//     };

    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var MarkerCode;

// //     // Loop through the stations (they're the same size and have partially matching data)
// //     for (var i = 0; i < stationInfo.length; i++) {

// //       // Create a new station object with properties of both station objects
// //       var station = Object.assign({}, stationInfo[i], stationStatus[i]);
// //       // If a station is listed but not installed, it's coming soon
      if (date == "1849-02-01") {
        MarkerCode = "PRE_INDUSTRIAL_REV";
      }
      // If a station has no bikes available, it's empty
      else if (date == "1914-02-01") {
        MarkerCode = "INDUSTRIAL_REV";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (date == "1963-02-01") {
        MarkerCode = "PRE_EPA";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (date == "2013-02-01") {
        MarkerCode = "CURRENT";
      }
      // Otherwise the station is normal
      else {
        MarkerCode = " ";
      }
      var newMarker = L.marker([lat, lon], {
        icon: icons[MarkerCode]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[MarkerCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup("City:" + data.city + "<br> Date :" + data.dt + "<br>" + "Land Temp:" +data.average_temperature);
    }
//       // Update the station count
//       stationCount[stationStatusCode]++;
//       // Create a new marker with the appropriate icon and coordinates
//       var newMarker = L.marker([station.lat, station.lon], {
//         icon: icons[stationStatusCode]
//       });

//       // Add the new marker to the appropriate layer
//       newMarker.addTo(layers[stationStatusCode]);

//       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }

//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, stationCount);
//   });
});

// Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }