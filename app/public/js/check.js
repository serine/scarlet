f = "data/stops.txt"

//domain = {-50, 150}

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};

var xScale = d3.scaleLinear().domain([143, 146 ]).range([0, 100]); // value -> display
var yScale = d3.scaleLinear().domain([-38, -36 ]).range([0, 50]); // value -> display
//
var chart1 = d3.select("body")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500)

d3.csv(f, function(error, d) {
    chart1.selectAll("svg")
        .data(d)
        .enter()
        .append("circle")
        .attr("cy", function(d)
                {return yScale(d.stop_lat)}
                )
        .attr("cx", function(d)
                {return xScale(d.stop_lon)}
                )
        .attr("r", 5)
        
    console.log(d)
});
