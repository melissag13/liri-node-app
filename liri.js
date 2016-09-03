// Grab the data from keys.js
var keys = require("./keys.js");
// Includes the FS package for reading and writing packages
var fs = require("fs");

var twitter = require("twitter");
var spotify = require("spotify");

// Grab the request package...
var request = require("request");

function my-tweets(){
	
};

function spotify-this-song(){

};

function movie-this(){
	if (movieName     ) {
		movieName = "Mr\. Nobody";
	} else ( )
		console.log("It\'s on Netflix!");

	// Run the request function to the OMDB API with the movie specified
	// The request function takes in a URL then returns three arguments:
	// 1. It provides an error if one exists.
	// 2. It provides a response (usually that the request was successful)  
	// 3. It provides the actual body text from the website <---- what actually matters	
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&r=json&plot=short&tomatoes=true", 
		function (error, response, body) {
		// If the request was successful (i.e. if the response status code is 200)
		if (!error && response.statusCode == 200) {
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
			var directedBy = JSON.parse(body).Director;

			console.log("Title of the movie: " + );
			console.log("Year it came out: " + );
			console.log("IMDB Rating: " + );
			console.log("Country where produced: " + );
			console.log("Language of movie: " + );
			console.log("Plot of the movie: " + );
			console.log("Actors in the movie: " + );
			console.log("Rotten Tomatoes Rating: " + );
			console.log("Rotten Tomatoes URL: " + );
		}
	}
};

function do-what-it-says(){

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
	}
};

