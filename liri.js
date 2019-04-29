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

//BandsInTown Function

function getBandsInTown(artist){
    var artist = searchTerm;
    var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandURL).then(function (response) {
        //using a for loop here in order to get all the events, not just the top one.
        for (i = 0; i < response.data.length; i++)
            console.log("================================");
            console.log("Name of Venue: " + response.data[i].venue.name + "\r\n");
            console.log("Venue location: " + response.data[i].venue.city + "\r\n");
            console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r\n")
        });
}; 