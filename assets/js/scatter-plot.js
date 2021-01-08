//variable for the pull of data
d3.csv("../assets/datasets/cleaned_Rome_city_temp.csv").then(function (data) {
    data.forEach(d => {
        d.dt =+d.date;
        d.average_temperature = +d.average_temperature
        console.log(data)
    });
    var margin = {top: 10, right: 30, bottom: 60, left: 60},
        width = 700 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    
    var svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left +"," + margin.top+ + ")");
    
    var x = d3.scaleLinear()
        .domain(d3.extent(data.map(d=> d.date)))
        .range([0, width]);
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height +40)
        .text("date (year)");

    var y = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.average_temperature)))
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y)),
    
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", (height / 2) * -1)
        .attr("y", -30)
        .text("Average Temperature (F)");
    
    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter()
        .append('g');

    gdots.append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.average_temperature))
        .attr("r", 8)
        .style("fill", "blue"),

    gdots.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.average_temperature))
        .attr("dx", -5)
        .attr("dy", 2)
        .style("font-size", "7px");
    
});