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
        for (i = 0; i < response.data.length; i++) {
            console.log("================================");
            console.log("Name of Venue: " + response.data[i].venue.name + "\r\n");
            console.log("Venue location: " + response.data[i].venue.city + "\r\n");
            console.log("Date of Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\r\n");
            //Log to a log.txt file
            fs.appendFileSync('log.txt', "\r\n" + "Concert Search Log----------------------" + "\r\n", 'utf8');
            fs.appendFileSync('log.txt', "\r\n" + "Venue Name: " + response.data[i].venue.name + "\r\n", 'utf8');
            s.appendFileSync('log.txt', "\r\n" + "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country + "\r\n", 'utf8');
            fs.appendFileSync('log.txt', "\r\n" + "Venue Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A') + "\r\n", 'utf8');
            fs.appendFileSync('log.txt', "\r\n" + "-----------------------------------------"+ "\r\n", 'utf8');
        }
    });
}; 

//Spotify Function

function getSpotify(songName){
    var spotify = new Spotify(keys.spotify);

    if(!songName){
        songName = "The Sign Ace of Base";
    };

    spotify.search({type: 'track', query: songName}, function (err, data){
        if (err) {
            return console.log("Error occured: " + err);
        }
        console.log("================================");
        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
        console.log("Preview: " + data.tracks.items[0].preview_url+ "\r\n");
        console.log("Album: "+ data.tracks.items[0].album.name + "\r\n");
        //add search to log.txt file
        fs.appendFileSync('log.txt', "\r\n" + "Song Search Log---------------------------------------"+ "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Song Name: " + data.tracks.items[0].name + "\r\n", 'utf8' );
        fs.appendFileSync('log.txt', "\r\n" + "Artist(s): " + data.tracks.items[0].artists[0].name + "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Album: " + data.tracks.items[0].album.name+ "\r\n", 'utf8');
        fs.appendFileSync('log.txt', "\r\n" + "Preview Link: " + data.tracks.items[0].preview_url + "\r\n", 'utf8' );
        fs.appendFileSync('log.txt', "\r\n" + "-------------------------------------------------------"+ "\r\n", 'utf8');

    });
};

//OMDB Function

function getOMDB(movie){
    if (!movie) {
        movie = "Mr. Nobody";
    }
    var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieURL).then(
        function (response){
            console.log("================================");
            console.log("Title: " + response.data.Title + "\r\n");
            console.log("Year Released: " + response.data.Year + "\r\n");
            console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("Country Where Produced: " + response.data.Country + "\r\n");
            console.log("Plot: " + response.data.Plot + "\r\n");
            console.log("Actors: " + response.data.Actors + "\r\n");

    });
};

//Function for random.txt file
function getRandom(){
    fs.readFile("random.txt", "utf8", (error, data) => {
        if (error) throw error;
        console.log(data);

        var randomData = data.split(",");
        liriRun(randomData[0], randomData[1]);
    });
};

//call command function
liriRun(command, userSearch);