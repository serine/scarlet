trainStops = "train_stops.txt"
//trainStopTimes = "data/2/stop_times.txt"
trainStopTimes = "train_stop_times.txt"
ff = "bus_stops.txt"
//ff = "data/3/stops.txt"
tmp = "tmp.txt"


// order in stopTimes array
// 0 trip_id
// 1 arrival_time
// 2 departure_time
// 3 stop_id
// 4 stop_sequence
// 5 stop_headsign
// 6 pickup_type
// 7 drop_off_type
// 8 shape_dist_traveled
//
function getDataValues(textFile, callback) {
//function getDataValues(textFile) {
    var sep = ","
    var dataObj = {};
    // 
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function(data) {
        // this is an array, where single element equals
        // to a line from a text file
        var lines = this.responseText.split("\n");
	// step through each line and separate items on a tab
        lines.forEach(function(l) {
            var rowList = l.split(sep);
            var stopId = rowList[3];
            if(typeof stopId !== 'undefined') {
                stopId = stopId.replace(/['"]+/g, '');
                if(!(stopId in dataObj))
                    dataObj[stopId] = [];
                dataObj[stopId].push(rowList);
            };
        });
	// return array of arrays as a callback
        callback(dataObj);
    });
    // true to enable async fetch, default is true
    // didn't have to specify it here
    oReq.open("GET", textFile, true);
    oReq.send();
};

//getDataValues(trainStopTimes, function(data) {
//getDataValues(tmp, function(data) {
//  console.log(data["stop_id"])
//});
//
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
    //.style("display", "inline")
    //.style("opacity", 0);

var timeTableDiv = d3.select("body").append("div")
    .attr("class", "stationName")
    .style("padding", "1em")
    .style("border-radius", "2em")
    .style("position", "absolute")
    .style("opacity", .97)
    //.style("display", "inline")
    //.style("opacity", 0);

//function getTimeTable(lists, station, callback) {
function getTimeTable(lists, station, now) {

    var h = now.getHours();
    var m = now.getMinutes();
    var chkTime = h+":"+m;

    var timeTable = "";

    station = station.split("Railway")[0];

    timeTable += "<pre>";
    timeTable += station;
    timeTable += "\n";
    timeTable += "Departure Times:";
    timeTable += "\n";
    var depTimes = [];
    lists.forEach(function(subList) {
        var arrival = subList[1];
        var departure = subList[2];
        departure = departure.replace(/['"]+/g, '');
        var t = departure.split(":")
        if(parseInt(t[0]) == parseInt(h)) {
            if(parseInt(m)-15 <= parseInt(t[1]) <= parseInt(m)+15) {
                depTimes.push(departure);
            };
        };
        //depTimes.push(departure.replace(/['"]+/g, ''));

        //timeTable += "A:";
        //timeTable += arrival;
        //timeTable += "\n";
        //timeTable += "D:";
        //timeTable += departure.replace(/['"]+/g, '');
        //timeTable += "\n";
        //timeTable += "--------\n";
    });
    depTimes.sort()
    var uniqueTimes = depTimes.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    //var depString = depTimes.join("\n")
    var depString = uniqueTimes.join("\n")
    
    timeTable += depString;
    timeTable += "</pre>";
    //console.log(timeTable);
    //callback(timeTable)
    //return timeTable;
    return uniqueTimes
};

function buildTable(arr) {

    var timeTable ="";
    timeTable += '<table class=".table">';

    arr.forEach(function(e) {
        timeTable += "<tr><td>"+e+"</td></tr>";
    });
    timeTable += "</table>";

    return timeTable;
};

var currentTime = new Date(); // for now
//var s = d.getSeconds();

d3.csv(trainStops, function(error, stopData) {

    getDataValues(trainStopTimes, function(stopTimes) {

        chart1.selectAll("g")
                .data(stopData)
                .enter()
                .append("circle")
                .attr("id", function(stopData) {return "stopId-"+stopData.stop_id} )
                //.on("mouseover", function(stopData) {
                .on("click", function(stopData) {
                    tooltip.transition()
                        .duration(200)
                        // cleaning up name string
                    //tooltip.html(stopData.stop_name.split("Railway")[0])
                    //tooltip.html(getTimeTable(stopTimes[stopData.stop_id], stopData.stop_name,  function(d) {return d}))
                    timeTableDiv.html("<h2>"+stopData.stop_name+"</h2>")
                        .style("left", (d3.event.pageX + 150) + "px")
                        .style("top", (d3.event.pageY - 128) + "px")
                    tooltip.html(buildTable(getTimeTable(stopTimes[stopData.stop_id], stopData.stop_name, currentTime)))
                        .style("left", (d3.event.pageX + 50) + "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                })
                //.on("mouseout", function(stopData) {
                .on("doubleclick", function(stopData) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .attr("cx", function(stopData) {return xScale(stopData.stop_lon)} )
                .attr("cy", function(stopData) {return yScale(stopData.stop_lat)} )
                .attr("r", 1)
                .attr("stroke", "blue")
                .attr("fill", "white")
    });
            
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

