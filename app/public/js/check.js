trainStops = "train_stops.txt"
trainStopTimes = "data/2/stop_times.txt"
ff = "bus_stops.txt"

//domain = {-50, 150}

var margin = {
    top: -450,
    right: 20,
    bottom: 30,
    left: -500
};
// 144 - 145 lon
var xScale = d3.scaleLinear().domain([144, 146 ]).range([0, 900]); // value -> display
var yScale = d3.scaleLinear().domain([-37, -38 ]).range([0, 300]); // value -> display
//
//var width = 1260;
//var height = 780;
var width = "100%";
var height = "100%";

var chart1 = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")" + "," + "scale(3,3)" );

//d3.csv(f, function(error, d) {
//    var max = d3.entries(d)
//    // sort by value descending
//        .sort(function(a, b) { return d3.descending(a.value, b.value); })
//    // take the first option
//    console.log(max)
//})
// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    //.style("display", "inline")
    .style("opacity", 0);

var timeTableDiv = d3.select("body").append("div")
    .attr("class", "timeTable")
    .style("position", "absolute")
    //.style("display", "inline")
    //.style("opacity", 0);


d3.csv(trainStops, function(error, stopData) {
    chart1.selectAll("g")
            .data(stopData)
            .enter()
            .append("circle")
            .attr("id", function(stopData) {return "stopId-"+stopData.stop_id} )
            //.attr("name", function(d) {return d.stop_name} )
            .on("mouseover", function(stopData) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                    // cleaning up name string
                tooltip.html(stopData.stop_name.split("(")[1].replace(")",""))
                //tooltip.html(stopData.stop_name)
                    .style("left", (d3.event.pageX + 50) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(stopData) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                })
            .attr("cx", function(stopData) {return xScale(stopData.stop_lon)} )
            .attr("cy", function(stopData) {return yScale(stopData.stop_lat)} )
            .attr("r", 1)
            .attr("stroke", "blue")
            .attr("fill", "white")
            
        //console.log(stopData)
        //console.log(stopTimesData[0])
});

//d3.csv(trainStopTimes, function(error, stopTimesData) {
//    //stopTimesData.forEach(function(e) {console.log(e.stop_id)})
//    chart1.selectAll("div")
//        .data(stopTimesData)
//        .enter()
//        .append("div")
//        .attr("class", "check")
//});


d3.csv(ff, function(error, d) {
    chart1.selectAll("g")
        .data(d)
        .enter()
        .append("circle")
        .attr("id", function(d) {return d.stop_id} )
        //.attr("name", function(d) {return d.stop_id} )
        .attr("cx", function(d) {return xScale(d.stop_lon)} )
        .attr("cy", function(d) {return yScale(d.stop_lat)} )
        .attr("r", 1)
        .attr("stroke", "green")
        .attr("fill", "white")
        .style("opacity", 0.1);
});

