# Scarlet

> Randomly generated and trimmed

Allow users to geospatially and interactively determine where public transport services are judge the quality of connections. Visual emphasis must be placed on route selection, and vehicles traveling on and to those routes.

## UI Design
- [UI for presentation](https://domenicomazza.github.io/scarlet/ui/)
- [Style guide](https://domenicomazza.github.io/scarlet/ui/style-guide.html)

## Data

- [Public Transport Victoria GTFS data](data/gtfs/README.md)

## Precedents

- [TRAVIC](http://tracker.geops.ch/?z=14&s=1&x=16137864.0494&y=-4552544.6017&l=transport)
- [D3 flight visualisation demo](http://www.decembercafe.org/demo/plane/)
- [Public transport graphic design collateral](https://www.pinterest.com/dmncmzz/transport/)
- [transitmap.net Pinterest](https://www.pinterest.com/camgbooth/transit-maps/)
- PTV mode colours &#x1F4D9;`bus #FF8201` &#x1F4D7;`tram #78BE21` &#x1F4D8;`train #0172CE` &#x1F49C;`regional #911C92`

## Scope
- Prototype using Caulfield group (Pakenham, Cranbourne and Frankston) train lines and intersecting tram and bus routes via the City Loop through D3v4.
- Display transport vehicles traveling on these lines in real-time by interpolating stop times. [TRAVIC](http://tracker.geops.ch/?z=14&s=1&x=16137864.0494&y=-4552544.6017&l=transport) is a relevant example.
- Aim for the quality of Uber, to clearly see vehicles and vehicle mode/route neatly.
- And more if we can.

## Timeline

Team Member | Tuesday | Wednesday | Thursday
----------- | ------- | --------- | -------- 
Dom | Project management + doc, design ideas | Design and web wireframe/assets | HTML/CSS magic + assets, manually find mode connections for faux nearest neighbour
Kizza | D3 nodes, on Node + doc | Stop nodes | Vehicle nodes, service info display
Lewis | D3 route investigation | Working routes | Routes/node animation

Friday: presentation.

All of the above, then beer.

## Quick start

Make simple server

```
var express = require('express'),
    app = express();
var process = require('process'),
    args = process.argv;

publicPath = args[2];
console.log("Serving from: " + publicPath);
app.use(express.static(publicPath));
app.listen(8080);
```

```
node simpleServer.js servingDirectory
```

`npm install express`
