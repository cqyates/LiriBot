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
var prompt = require("inquirer");



//api keys in their own file that is not shared on github
var spotify = new Spotify(keys.spotify);

//switch function for each type of search; spotify, OMDB or BandsinTown
function liriRun(command, searchTerm){
    switch (command){
        case "concert-this":
        getBandsInTown(searchTerm);
        break;

        case "spotify-this-song":
        getSpotify(searchTerm);
        break;

        case "movie-this":
        getOMDB(searchTerm);
        break;

        case "do-what-it-says":
        getRandom();
        break;
    }
};