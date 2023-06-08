// Index html
const nameInputEl = $('#name');
const submitBtnEl = $('#submit');
const yearEl = $('#yearSlider')
const genreEl = $('#genreDropdown');

//Final HTML
const movieCard = $('.movie-card')
const moviePoster = $('#movie-photo');
const movieTitle = $('#movie-title');
const releaseDate = $('#release-date');
const runtime = $('#runtime');
const director = $('#director');
const starring = $('#starring');
const synopsis = $('#synopsis');
const loader = $('#loader');

var streamingArr = [];

var yearEnd = dayjs().format('YYYY')

// Go button
$(document).ready(function () {
	yearEl.on("input", function () {
		var sliderValue = $(this).val();
		$('#yearDisplay').text(sliderValue + "-PRESENT");
	});
	submitBtnEl.on("click", function () {
		if ((genreEl.val() === '')) {
			return
		} else {
			localStorage.setItem('year', yearEl.val());
			localStorage.setItem('genre', genreEl.val());
			window.location.href = "final.html";
		}
	});
});

var genreOptions = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "News", "Romance", "Sci-Fi", "Short", "Sport", "Thriller", "War", "Western"];

// Genre dropdown select
$.each(genreOptions, function (index, option) {
	$('#genreDropdown').append($('<option>', {
		value: option,
		text: option
	}));
});

getStoredItems();

// Randomizes movie database call data
function randomMovie(movies) {
	var index = Math.floor(Math.random() * movies.results.length)
	displayMovie(movies.results[index]);
}

// Randomizes year and passes that year and selected genre to movie database
function getStoredItems() {
	var yearStore = localStorage.getItem('year', yearStore);
	var genreStore = localStorage.getItem('genre', genreStore);
	
	var min = Math.ceil(yearStore);
	var max = Math.floor(yearEnd);
 	var yearRandom = Math.floor(Math.random() * (max - min + 1) + min);
	movieAPICall(yearRandom, genreStore);

}

// Movie Database API - Array of movies
function movieAPICall(year, genre) {

	const optionsd = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};


	fetch(`https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&genre=${genre}&year=${year}`, optionsd) 
		.then(response => response.json())
		.then(response => randomMovie(response))
		.catch(err => console.error(err));

}

//Local storage for the user name input
var userName = localStorage.getItem('name', userName);
localStorage.setItem('name', userName);

// Streaming Availability API - Streaming information
function getStreaming(movieId) {
	
	const options = {
		method: 'GET',
		headers: {
			regions: 'US',
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
		}
	};
	
	fetch(`https://watchmode.p.rapidapi.com/title/${movieId}/sources/`, options)
		.then(response => response.json())
		.then(response => streamingOptions(response))
		.catch(err => console.error(err));
		
}

// MovieDB API - Information about a particular movie

function displayMovie(choosenMovie) {
		
	var movieId = choosenMovie.id;

	const options2 = {
		method: 'GET',
		headers: {
		  accept: 'application/json',
		  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY4N2M0MjJmZTZmZmM1MGRhNWIxOGJjNjM4ODhlZSIsInN1YiI6IjY0ODIyNGYzZTI3MjYwMDEwNzIwZjVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IYiNnOE5fG1AoDDgyj10vswpWqkoegXIEPs7RAAVKHQ'
		}
	  };
	  
	  fetch('https://api.themoviedb.org/3/configuration', options2)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

	const options = {
		method: 'GET',
		headers: {
		  accept: 'application/json',
		  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY4N2M0MjJmZTZmZmM1MGRhNWIxOGJjNjM4ODhlZSIsInN1YiI6IjY0ODIyNGYzZTI3MjYwMDEwNzIwZjVmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IYiNnOE5fG1AoDDgyj10vswpWqkoegXIEPs7RAAVKHQ'
		}
	  };
	  
	  fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images%2Cwatchproviders%2Ccredits&language=en-US`, options)
		.then(response => response.json())
		.then(response => displayMovieDetails(response))
		.catch(err => console.error(err));
	}

// Adds selected movie information to final HTML page
function displayMovieDetails (response) {

	getStreaming(response.imdb_id);
	movieTitle.text(response.title);
	releaseDate.text(response.release_date);
	moviePoster.attr('src', `http://image.tmdb.org/t/p/original${response.poster_path}`);
	runtime.text(`Runtime: ${response.runtime} minutes`);
	synopsis.text(`Synopsis: ${response.overview}`);
	starring.text(`Starring: ${response.credits.cast[0].name}, ${response.credits.cast[1].name}, ${response.credits.cast[2].name}`);
	director.text(`Directed By: ${response.credits.crew[0].name}`);
	movieCard.removeClass('hidden')
	loader.addClass('hidden')

}; 

// Finds streaming options available to chosen movie
function streamingOptions(response) {

			streamingArr = [];
			for (i=0; i < response.length; i++) {

			streamingArr.push(response[i].name)

		}

		let streamingArray = [...new Set(streamingArr)];

		if (streamingArray.length === 0) {
				$('#watch-this').text("*Oops, looks like there are no streaming options available")
				$('#watch-this').addClass('no-underline')
			} else {
			
				for (i=0; i < streamingArray.length; i++) {

				var streamingOptions = $('<li>').text(streamingArray[i]);
				streamingOptions.addClass('text-[#FDF5E6] text-center align-text-top')
				$('#streaming-list').append(streamingOptions);

			}}
	}

$('#try-again-button').on('click', function() {
	window.location.reload();
});