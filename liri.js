require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//variables for the node command line
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");