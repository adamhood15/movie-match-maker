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

//go button
$(document).ready(function () {
	yearEl.on("input", function () {
		var sliderValue = $(this).val();
		$('#yearDisplay').text(sliderValue + "-PRESENT");
	});
	submitBtnEl.on("click", function () {
		if ((nameInputEl.val() === '') || (genreEl.val() === '')) {
			return
		} else {
			localStorage.setItem('name', nameInputEl.val());
			localStorage.setItem('year', yearEl.val());
			localStorage.setItem('genre', genreEl.val());
			window.location.href = "final.html";
		}
	});
});

var genreOptions = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "News", "Romance", "Sci-Fi", "Short", "Sport", "Thriller", "War", "Western"];


$.each(genreOptions, function (index, option) {
	$('#genreDropdown').append($('<option>', {
		value: option,
		text: option
	}));
});

getStoredItems();

function randomMovie(movies) {
	var index = Math.floor(Math.random() * movies.results.length)
	displayMovie(movies.results[index]);
	getStreaming(movies.results[index]);
}


function getStoredItems() {
	var yearStore = localStorage.getItem('year', yearStore);
	var genreStore = localStorage.getItem('genre', genreStore);
	
	var min = Math.ceil(yearStore);
	var max = Math.floor(yearEnd);
 	var yearStart = Math.floor(Math.random() * (max - min + 1) + min);
	movieAPICall(yearStart, genreStore);

}

function movieAPICall(year, genre) {

	const optionsd = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};


	fetch(`https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&genre=${genre}&year=${year}`, optionsd) // &endYear=${yearEnd-1}
		.then(response => response.json())
		.then(response => randomMovie(response))
		.catch(err => console.error(err));

}

//local storage for the userInput
var userName = localStorage.getItem('name', userName);

localStorage.setItem('name', userName);

//Displays the users name on the restaurant HTML page
addEventListener("DOMContentLoaded", (event) => {
	$('.closing-text').text(`Enjoy your movie, ${userName}`);
});

// Movie API that pulls streaming information (FUTURE DEVELOPMENT)
function getStreaming(choosenMovie) {
	
	var movieId = choosenMovie.id;
	movieId = 'tt0848228';
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


function displayMovie(choosenMovie) {

	var movieId = choosenMovie.id;

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'bad0045a2bmsh9b343dc823377f1p1ec393jsnedd5b16a4bce',
			'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
		}
	};
	
	fetch(`https://moviesdb5.p.rapidapi.com/om?i=${movieId}`, options)
		.then(response => response.json())
		.then(response => displayMovieDetails(response))
		.catch(err => console.error(err));

 }

function displayMovieDetails (response) {

	if ((response.Poster === 'N/A')|| (response.Title === 'N/A') || (response.Year === 'N/A') || (response.Runtime === 'N/A') || (response.Director === 'N/A') || (response.Actors === 'N/A') || (response.Plot === 'N/A')){
		getStoredItems();
	} else {
		moviePoster.attr('src', response.Poster);
		movieTitle.text(response.Title);
		releaseDate.text(response.Year);
		runtime.text(`Runtime: ${response.Runtime}`);
		director.text(`Directed By: ${response.Director}`);
		starring.text(`Starring:  ${response.Actors}`)
		synopsis.text(`Synopsis: ${response.Plot}`)
		movieCard.removeClass('hidden')
		loader.addClass('hidden')
	}

} 

function streamingOptions(response) {
	
	for (i=0; i < response.length; i++) {
		streamingArr.push(response[i].name)
	}

	let streamingArray = [...new Set(streamingArr)];

	for (i=0; i < streamingArray.length; i++) {
		var streamingOptions = $('<li>').text(streamingArray[i]);
		streamingOptions.addClass('text-[#FDF5E6] ')
		$('#streaming-list').append(streamingOptions);
	}

}