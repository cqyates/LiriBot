require("dotenv").config();


//variables for the node command line
var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

//required modules
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var moment = require('moment');
var omdb = require('omdb');
var fs = require('fs');
var axios = require("axios");



//api keys in their own file that is not shared on github
var spotify = new Spotify(keys.spotify);