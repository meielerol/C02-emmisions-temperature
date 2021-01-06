//isolate the object for the scatter plot from the html
var scatterplot = d3.select("#scatter-plot-visual")

//variable for the pull of data
var data = d3.csv("../assets/datasets/cleaned_major_city_temp.csv")

//console log it
console.log(data)
//data pull is successful !!!
// import { swatches } from "@d3/color-legend"

//next build the plot
function brush(cell, circle, svg) {
    const brush = d3.brush()
        .extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]])
        .on("start", brushstarted)
        .on("brush", brushed)
        .on("end", brushended);

    cell.call(brush);

    let brushCell;

    // Clear the previously-active brush, if any.
    function brushstarted() {
        if (brushCell !== this) {
            d3.select(brushCell).call(brush.move, null);
            brushCell = this;
        }
    }
    // Highlight the selected circles.
    function brushed({ selection }, [i, j]) {
        let selected = [];
        if (selection) {
            const [[x0, y0], [x1, y1]] = selection;
            circle.classed("hidden",
                d => x0 > x[i](d[columns[i]])
                    || x1 < x[i](d[columns[i]])
                    || y0 > y[j](d[columns[j]])
                    || y1 < y[j](d[columns[j]]));
            selected = data.filter(
                d => x0 < x[i](d[columns[i]])
                    && x1 > x[i](d[columns[i]])
                    && y0 < y[j](d[columns[j]])
                    && y1 > y[j](d[columns[j]]));
        }
        svg.property("value", selected).dispatch("input");
    }

    // If the brush is empty, select all circles.
    function brushended({ selection }) {
        if (selection) return;
        svg.property("value", []).dispatch("input");
        circle.classed("hidden", false);
    }
}
columns = ['dt', 'average_temperature', 'city', 'country', 'latitude', 'logitude']

width = 954

padding = 50

size = (width - (columns.length + 1) * padding) / columns.length + padding   

x = columns.map(c => d3.scaleLinear()
        .domain(d3.extent(data, d => d[c]))
        .rangeRound([padding / 2, size - padding / 2]));

    y = x.map(x => x.copy().range([size - padding / 2, padding / 2]))

    z = d3.scaleOrdinal()
        .domain(data.map(d => d.average_temperature))
        .range(d3.schemeCategory10);

    // yAxis = {
    //     const axis = d3.axisLeft()
    //     .ticks(6)
    //     .tickSize(-size * columns.length);
    //     return g => g.selectAll("g").data(y).join("g")
    //         .attr("transform", (d, i) => `translate(0,${i * size})`)
    //         .each(function (d) { return d3.select(this).call(axis.scale(d)); })
    //         .call(g => g.select(".domain").remove())
    //         .call(g => g.selectAll(".tick line").attr("stroke", "#ddd"))
// }




