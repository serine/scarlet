# Scarlet

> Randomly generated and trimmed

## Content

- [About data](data/gtfs/README.md)

## Proposal?

Want to have moving objects, where each object represents different types of public transport. So that one can zoom in to the area of interest and
see all available options for travel. This should have actual times (timetable) associated with the desirable stops like ubering public transport. 

Alos being able to rate the service can be useful

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
