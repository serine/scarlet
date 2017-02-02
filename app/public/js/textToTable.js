/* 
 * Makes html table from tsv file
 *
 * author: serine
 * date: 27/5/16
 * 
 */

//var f = 'dataFiles/motifCountsTable.txt'
var f = 'motifCountsTable.txt'

function getDataValues(textFile, callback) {
//function getDataValues(textFile) {
    var dataValues = []
    // 
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function(data) {
        // this is an array, where single element equals
        // to a line from a text file
        var lines = this.responseText.split("\n");
	// step through each line and separate items on a tab
        lines.forEach(function(l) {
            var rowList = l.split("\t");
            dataValues.push(rowList);
        });
	// return array of arrays as a callback
        callback(dataValues)
    });
    // true to enable async fetch, default is true
    // didn't have to specify it here
    oReq.open("GET", textFile, true);
    oReq.send();
}

function bubbleSort(arr, idx){
    var len = arr.length;
    for (var i = len-1; i>=0; i--){
        for(var j = 1; j<=i; j++){
            if(arr[j-1][idx]>arr[j][idx]){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            };
        };
    };
    console.log(arr)
    return arr;
};

function trender(arr) {
    var tblId = 'data_table';
    // html body reference
    var body = document.body;
    // make new div element
    var d = document.createElement('div');
    // make new table element
    var tbl = document.createElement('table');
    tbl.id = tblId;
    tbl.setAttribute('class', 'table table-striped');
    // separate table into head and body
    // make body element for the rest of the data
    var tbody = document.createElement('tbody');
    //
    //var jscript = document.createElement('script');
    //jscript.setAttribute('src', 'js/tsort.js')
    // append information into the right place
    tbl.appendChild(thead);
    tbl.appendChild(tbody);
    d.appendChild(tbl);
    //body.appendChild(jscript);
    body.appendChild(d);

    arr.forEach(function(l, rowIdx) {
        var nrow = tbody.rows.length;
        // insert new row 
        var newRow = tbody.insertRow(nrow);
        newRow.setAttribute('id', 'row'+rowIdx);
        // step through items for the row and insert them into individual cells
        l.forEach(function(e, idx) {
            var newCell = newRow.insertCell(idx);
            //newCell.setAttribute('id', headerItems[idx]+rowIdx);
            newCell.setAttribute('class', headerItems[idx]);
            var newText = document.createTextNode(e);
            newCell.appendChild(newText);
        });
    });
};

getDataValues(f, function(data) {
    var tblId = 'data_table';
    // html body reference
    var body = document.body;
    // make new div element
    var d = document.createElement('div');
    // make new table element
    var tbl = document.createElement('table');
    tbl.id = tblId;
    tbl.setAttribute('class', 'table table-striped');
    // separate table into head and body
     make head element
    var thead = document.createElement('thead');
    // insert one row for header elements
    var headerRow = thead.insertRow();
    // make body element for the rest of the data
    var tbody = document.createElement('tbody');
    //
    //var jscript = document.createElement('script');
    //jscript.setAttribute('src', 'js/tsort.js')
    // append information into the right place
    tbl.appendChild(thead);
    tbl.appendChild(tbody);
    d.appendChild(tbl);
    //body.appendChild(jscript);
    body.appendChild(d);
     header list
    var headerItems = data.shift();
    // step through the header items and make header row inside thead element
    headerItems.forEach(function(e, idx) {
        var newCell = headerRow.insertCell(idx);
        newCell.setAttribute('id', headerItems[idx]+'_header');
        newCell.setAttribute('class', headerItems[idx]);
        // Append a text node to the cell
        var newText = document.createTextNode(e);
        //add hide function on double click
        //newCell.ondblclick = function() {
        //    var theCol = document.getElementsByClassName(this.className);
        //    for(var i = 0; i < theCol.length; i++) {
        //        theCol[i].style.display = 'none';
        //    };
        //};
        //newCell.onclick = bubbleSort(data, idx)
        newCell.onclick = function() {
            var len = data.length;
            for (var i = len-1; i>=0; i--){
                for(var j = 1; j<=i; j++){
                    if(data[j-1][idx]>data[j][idx]){
                        var temp = data[j-1];
                        data[j-1] = data[j];
                        data[j] = temp;
                    };
                };
            };
            trender(data);
            //return data;
        };
        newCell.appendChild(newText);
    });

    trender(data);
    // step through the rest of the data and append to tbody element
    //data.forEach(function(l, rowIdx) {
    //    var nrow = tbody.rows.length;
    //    // insert new row 
    //    var newRow = tbody.insertRow(nrow);
    //    newRow.setAttribute('id', 'row'+rowIdx);
    //    // step through items for the row and insert them into individual cells
    //    l.forEach(function(e, idx) {
    //        var newCell = newRow.insertCell(idx);
    //        //newCell.setAttribute('id', headerItems[idx]+rowIdx);
    //        newCell.setAttribute('class', headerItems[idx]);
    //        var newText = document.createTextNode(e);
    //        newCell.appendChild(newText);
    //    });
    //});
});
