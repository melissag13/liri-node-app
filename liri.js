// Grab the data from keys.js (./ = look in current folder)
var keys = require("./keys.js");

var Twitter = require("twitter");

var spotify = require('spotify');

var request = require('request');

var fs = require("fs");

// Put this in a function so it doesn't automatically runs, only when you call it
var getTweets = function() {

var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: "melissag131"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        // console.log(tweets);
            //loop through all of the tweets
            for(var i=0; i<tweets.length; i++) {
                // tweets[i] = whatever tweet position you are at
                console.log(tweets[i].created_at);
                console.log('');
                console.log(tweets[i].text);
              
             }
          }
    });
}

var getArtist = function(artist) {
    return artist.name;
}
var getSpotify = function(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Loops through songs and pulls out attributes to display only the info we want user to see
       var songs = data.tracks.items;
            for(var i = 0; i < songs.length; i++){
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtist));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
        }

    });
}

var getMovie = function(movieName) {
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);

            console.log("Title of the movie: " + jsonData.Title);
            console.log("Year it came out: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country where produced: " + jsonData.Country);
            console.log("Language of movie: " + jsonData.Language);
            console.log("Plot of the movie: " + jsonData.Plot);
            console.log("Actors in the movie: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
            console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);

             
        }
    });
}

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) 
            throw error;
        // We will then print the contents of data
        console.log(data);
        var dataArr = data.split(",");
            if(dataArr.length == 2) {
                pick(dataArr[0], dataArr[1]);
            } else if (dataArr.length == 1) {
                pick(dataArr[0]);
            }
    });
}
var pick = function(caseData, functionData) {
    switch(caseData) {
        case "my-tweets":
            getTweets();
            break;
        case "spotify-this-song":
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
        
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);



























// // Includes the FS package for reading and writing packages
// var fs = require("fs");




// // Grab the request package...
// var request = require("request");

// var liriArg = process.argv[2];
// 	switch(liriArg) {
// 		case "myTweets": myTweets(); break;
// 		case "spotifyThisSong": spotifyThisSong(); break;
// 		case "movieThis": movieThis(); break;
// 		case "doWhatItSays": doWhatItSays(); break;
// 	};

// function myTweets(){
// 	var Twitter = require("twitter");
// 	var client = new Twitter(keys.twitterKeys)

// 	var twitterUsername = process.argv[3];
// 		if(!twitterUsername){
// 			twitterUsername = "melissag131";
// 		}	
 
// 	var params = {screen_name: twitterUsername};
// 		client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 	  		if (!error) {
// 	    	// console.log(tweets);
// 	    		for(var i=0; i < tweets.length; i++){
// 				console.log(tweets[i].created_at);
// 				console.log('');
// 				console.log(tweets[i].text);
// 			}
// 	}	else {
// 				console.log("Error :"+ error);
// 				return;
// 			}
// 		// console.log(error);
// 		// console.log(tweets);
// 		// console.log(response);
// 	});
// };

// function spotifyThisSong(songName){
// 	var spotify = require("spotify");
// 	var songName = process.argv[3];
// 		if (songName === undefined){
// 			songName = "The Sign by Ace of Base";
// 			}
// 	params = songName;		
// 	spotify.search({ type: "track", query: params }, function(err, data) {
//     	if (!err) {
        	
// 		    var songs = data.tracks.items;
// 				for(var i = 0; i < songs.length; i++){
// 					console.log(i);
// 					console.log("artist(s): " + songs[i].artists);
// 					console.log("song name: " + songs[i].name);
// 					console.log("preview song: " + songs[i].preview_url);
// 					console.log("album: " + songs[i].album.name);
// 					console.log("-----------------------------------");
//     }
 	
		
// 		}	else {
// 				console.log("Error :"+ err);
// 				return;
// 	}
    
// });

// };

// function movieThis(){
// 	var movie = process.argv[3];
// 	if (movieName === undefined) {
// 		movieName = "Mr. Nobody";
// 	} 
// 	params = movieName
// 	// Run the request function to the OMDB API with the movie specified
// 	// The request function takes in a URL then returns three arguments:
// 	// 1. It provides an error if one exists.
// 	// 2. It provides a response (usually that the request was successful)  
// 	// 3. It provides the actual body text from the website <---- what actually matters	
// 	request("http://www.omdbapi.com/?t=", + movieName + "&y=&r=json&plot=short&tomatoes=true", function(error, response, body) {
// 		// If the request was successful (i.e. if the response status code is 200)
// 		if (!error && response.statusCode == 200) {
// 			// Parse the body of the site and recover just the imdbRating
// 			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
// 			var jsonData = JSON.parse(body);

// 				console.log("Title of the movie: " + jsonData.Title);
// 				console.log("Year it came out: " + jsonData.Year);
// 				console.log("IMDB Rating: " + jsonData.imdbRating);
// 				console.log("Country where produced: " + jsonData.Country);
// 				console.log("Language of movie: " + jsonData.Language);
// 				console.log("Plot of the movie: " + jsonData.Plot);
// 				console.log("Actors in the movie: " + jsonData.Actors);
// 				console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
// 				console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);

// 		}	else {
// 				console.log("Error :"+ error);
// 				return;
// 			}
	
// });

// function doWhatItSays(){

// 	// This block of code will read from the "random.txt" file.
// 	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// 	// The code will store the contents of the reading inside the variable "data" 
// 	fs.readFile("random.txt", "utf8", function(error, data){
// 			// We will then print the contents of data
// 			console.log(data);
// 		// Then split it by commas (to make it more readable)
// 		var dataArr = data.split(',');
// 			if (dataArr.length == 2){
// 				pick(dataArr[0], dataArr[1]);
// 			} else if (dataArr.length == 1){
// 				pick(dataArr[0]);
// 		}
// 			// We will then re-display the content with the split for aesthetics.
// 			console.log(dataArr);
// 	});
// };


