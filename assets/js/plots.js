function buildPlot(){
  fetch('http://localhost:5000/todos')
    .then(response => response.json())
    .then(function(data){
      let parisDates = []
      let parisTemp = []
      let maxParisTempArray = []


      let taipeiDates=[]
      let taipeiTemp=[]
      
      let saintpetersburgDates=[]
      let saintpetersburgTemp=[]
      
      let sydneyDates=[]
      let sydneyTemp=[]
      
      let newyorkDates=[]
      let newyorkTemp=[]
      


      let parisData = data.filter(d=>d.city =='Paris')
      let taipeiData = data.filter(d=>d.city =='Taipei')
      let saintpetersburgData = data.filter(d=>d.city =='Saint Petersburg')
      let sydneyData = data.filter(d=>d.city =='Sydney')
      let newyorkData = data.filter(d=>d.city =='New York')
      
      
      for (var i = 0; i < parisData.length; i++){
        
        let climateChange = parisData[i]
        
        objDate = climateChange.dt
        let d = new Date(objDate)
        maxParisTempArray.push(d.toLocaleDateString())
        parisDates.push(d.toISOString())
        
        let objTemperature = climateChange.average_temperature
        average_temperature = (objTemperature)
        
        parisTemp.push(average_temperature)      
      }
      for (var i = 0; i < taipeiData.length; i++){
        
        let climateChange = taipeiData[i]
       
        objDate = climateChange.dt
        let d = new Date(objDate)
        
        taipeiDates.push(d.toISOString())
        
        let objTemperature = climateChange.average_temperature
        average_temperature = (objTemperature)
        
        taipeiTemp.push(average_temperature)      
      }
      for (var i = 0; i < saintpetersburgData.length; i++){
        
        let climateChange = saintpetersburgData[i] 
        
        objDate = climateChange.dt
        let d = new Date(objDate)
        
        saintpetersburgDates.push(d.toISOString())
        
        let objTemperature = climateChange.average_temperature
        average_temperature = (objTemperature)
        
        saintpetersburgTemp.push(average_temperature)      
      }
      for (var i = 0; i < sydneyData.length; i++){
        
        let climateChange = sydneyData[i]
       
        objDate = climateChange.dt
        let d = new Date(objDate)
        
        sydneyDates.push(d.toISOString())
        
        let objTemperature = climateChange.average_temperature
        average_temperature = (objTemperature)
        
        sydneyTemp.push(average_temperature)      
      }
      for (var i = 0; i <  newyorkData.length; i++){
        
        let climateChange =  newyorkData[i]
       
        objDate = climateChange.dt
        let d = new Date(objDate)
        
        newyorkDates.push(d.toISOString())
        
        let objTemperature = climateChange.average_temperature
        average_temperature = (objTemperature)
        
        newyorkTemp.push(average_temperature)      
      }

      
      //  Define SVG area dimensions
        var svgWidth = 0;
        var svgHeight = 700;

        // // Define the chart's margins as an object
        // var margin = {
        //   top: 60,
        //   right: 60,
        //   bottom: 60,
        //   left: 60
        // };

        // // Define dimensions of the chart area
        // var chartWidth = svgWidth - margin.left - margin.right;
        // var chartHeight = svgHeight - margin.top - margin.bottom;

        // Select body, append SVG area to it, and set its dimensions
        var svg = d3.select("#locations-visual")
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);

        // Append a group area, then set its margins
        // var chartGroup = svg.append("g")
        // .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var trace1 = {
          type: "scatter",
          // mode: "lines",
          x: parisDates,
          y: parisTemp,
          name: 'Paris',
          line: {color: 'red'}
        }

        var trace2 = {
          type: "scatter",
          // mode: "lines",
          x: taipeiDates,
          y: taipeiTemp,
          line: {color: 'blue'}
        }

        var trace3 = {
          type: "scatter",
          // mode: "lines",
          x: saintpetersburgDates,
          y: saintpetersburgTemp,
          name: 'Saint Petersburg',
          line: {color: 'green'}
        }
        
        var trace4 = {
          type: "scatter",
          // mode: "lines",
          x: sydneyDates,
          y: sydneyTemp,
          line: {color: 'yellow'}
        }

        var trace5 = {
          type: "scatter",
          // mode: "lines",
          x: newyorkDates,
          y: newyorkTemp,
          name: 'New York',
          line: {color: 'orange'}
        }
        var data = [trace1, trace2, trace3, trace4, trace5];

        var layout = {
          title: 'Time Series Graph',
          xaxis: {
            autorange: ['1743-11-01', '2013-11-01'],
            type: 'date'
          },
          yaxis: {
            autorange: false,
            range: [-20, 30],
            type: 'linear'
          }
        };
      Plotly.newPlot("locations-visual",  data, layout);
    })
}
buildPlot()
