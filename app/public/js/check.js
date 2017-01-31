f = "data/2/stops.txt"
ff = "data/3/stops.txt"

//domain = {-50, 150}

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};
// 144 - 145 lon
var xScale = d3.scaleLinear().domain([144, 146 ]).range([0, 1000]); // value -> display
var yScale = d3.scaleLinear().domain([-39, -37 ]).range([0, 900]); // value -> display
//
var chart1 = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")

//d3.csv(f, function(error, d) {
//    var max = d3.entries(d)
//    // sort by value descending
//        .sort(function(a, b) { return d3.descending(a.value, b.value); })
//    // take the first option
//    console.log(max)
//})

d3.csv(f, function(error, d) {
    chart1.selectAll("svg")
        .data(d)
        .enter()
        .append("circle")
        .attr("id", function(d) {return d.stop_id} )
        //.attr("name", function(d) {return d.stop_id} )
        .attr("cx", function(d) {return xScale(d.stop_lon)} )
        .attr("cy", function(d) {return yScale(d.stop_lat)} )
        .attr("r", 5)
        .attr("stroke", "blue")
        
    console.log(d)
});


d3.csv(ff, function(error, d) {
    chart1.selectAll("svg")
        .data(d)
        .enter()
        .append("circle")
        .attr("id", function(d) {return d.stop_id} )
        //.attr("name", function(d) {return d.stop_id} )
        .attr("cx", function(d) {return xScale(d.stop_lon)} )
        .attr("cy", function(d) {return yScale(d.stop_lat)} )
        .attr("r", 5)
        .attr("stroke", "red")
});

