// Grab the data from keys.js
var keys = require("./keys.js");
// Includes the FS package for reading and writing packages
var fs = require("fs");

var Twitter = require("twitter");
var spotify = require("spotify");

// Grab the request package...
var request = require("request");

function mytweets(){
	var client = new Twitter({
	  consumer_key: "",
	  consumer_secret: "",
	  access_token_key: "",
	  access_token_secret: ""
});
 
var params = {screen_name: "melissag131"};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	    for(var i=0; i < tweets.length; i++){
			console.log(tweets[i].created_at);
			console.log('');
			console.log(tweets[i].text);
			}
	  }

	});
};

function spotifythissong(songName){
	if (songName === undefined){
		songName = "The Sign by Ace of Base";
		}

	spotify.search({ type: "track", query: songName }, function(err, data) {
    	if ( err ) {
        console.log("Error occurred: " + err);
        return;
    }
 	var songs = data.tracks.items;
		for(var i = 0; i < songs.length; i++){
		console.log(i);
		console.log("artist(s): " + songs[i].artists.map(getArtistNames));
		console.log("song name: " + songs[i].name);
		console.log("preview song: " + songs[i].preview_url);
		console.log("album: " + songs[i].album.name);
		console.log("-----------------------------------");
	}
    
});

};

function moviethis(){
	if (movieName === undefined) {
		movieName = "Mr. Nobody";
	} 

	// Run the request function to the OMDB API with the movie specified
	// The request function takes in a URL then returns three arguments:
	// 1. It provides an error if one exists.
	// 2. It provides a response (usually that the request was successful)  
	// 3. It provides the actual body text from the website <---- what actually matters	
	request("http://www.omdbapi.com/?t=", + movieName + "&y=&r=json&plot=short&tomatoes=true", function(error, response, body) {
		// If the request was successful (i.e. if the response status code is 200)
		if (!error && response.statusCode == 200) {
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
			var jsonData = JSON.parse(body);

				console.log("Title of the movie: " + jsonData.Title);
				console.log("Year it came out: " + jsonData.Year);
				console.log("IMDB Rating: " + jsonData.imdbRating);
				console.log("Country where produced: " + jsonData.Country);
				console.log("Language of movie: " + jsonData.Language);
				console.log("Plot of the movie: " + jsonData.Plot);
				console.log("Actors in the movie: " + jsonData.Actors);
				console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
				console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
		}
	
});

function dowhatitsays(){

	// This block of code will read from the "random.txt" file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data" 
	fs.readFile("random.txt", "utf8", function(error, data){
			// We will then print the contents of data
			console.log(data);
		// Then split it by commas (to make it more readable)
		var dataArr = data.split(',');
			// We will then re-display the content with the split for aesthetics.
			console.log(dataArr);
	});
};
mytweets();
spotifythissong();
moviethis();
dowhatitsays();
