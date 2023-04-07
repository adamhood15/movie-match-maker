// home html
const nameInputEl = $('#name');
const addressInputEl = $('#address');
const submitBtnEl = $('#submit');
const distanceEl = $('#distanceSlider')

// resturant html
const restaurantPhotoEl = $('#restaurant-photo');
const restaurantInfoEl = $('#restaurant-info');
const restaurantWebpageEl = $('#restaurant-webpage');
const restaurantAddressEl = $('#restaurant-address');
const restaurantPhoneNumEl = $('#restaurant-phone-num');
const tryAgainBtnEl = $('#try-again-btn');
const priceEl = $('#price');
const ratingEl = $('#rating');
const genreEl = $('#genreDropdown');

//Final HTML
const moviePoster = $('#movie-photo');
const movieTitle = $('#movie-title');
const releaseDate = $('#release-date');
const runtime = $('#runtime');
const director = $('#director');
const starring = $('#starring');
const synopsis = $('#synopsis');

var yearEnd = dayjs().format('YYYY')

//go button
$(document).ready(function () {
	distanceEl.on("input", function () {
		var sliderValue = $(this).val();
		$('#distanceDisplay').text("Movies from " + sliderValue + "-Present");
	});
	submitBtnEl.on("click", function () {
		localStorage.setItem('name', nameInputEl.val());
		localStorage.setItem('year', distanceEl.val());
		localStorage.setItem('genre', genreEl.val());
		window.location.href = "final.html";
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
	var choosenMovie = movies.results[index].titleText.text
	console.log(choosenMovie)
	console.log(movies.results[index])
	displayMovie(movies.results[index]);
	// getStreaming(choosenMovie);
}


function getStoredItems() {
	var yearStore = localStorage.getItem('year', yearStore);
	console.log(yearStore)
	console.log(yearEnd)
	var genreStore = localStorage.getItem('genre', genreStore);
	
	var min = Math.ceil(yearStore);
	var max = Math.floor(yearEnd);
 	var yearStart = Math.floor(Math.random() * (max - min + 1) + min);
	console.log(yearStart)
	movieAPICall(yearStart, genreStore);

}

function movieAPICall(year, genre) {

	const optionsd = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};


	fetch(`https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&list=top_boxoffice_200&genre=${genre}&year=${year}`, optionsd) // &endYear=${yearEnd-1}
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
// function getStreaming() {
	
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			regions: 'US',
// 			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
// 			'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
// 		}
// 	};
	
// 	fetch('https://watchmode.p.rapidapi.com/title/tt0848228/sources/', options)
// 		.then(response => response.json())
// 		.then(response => console.log(response))
// 		.catch(err => console.error(err));
		
// }

// getStreaming();

function displayMovie(choosenMovie) {

	var movieId = choosenMovie.id;
// movieId = tt11598412;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
			'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
		}
	};
	
	fetch(`https://moviesdb5.p.rapidapi.com/om?i=${movieId}`, options)
		.then(response => response.json())
		.then(response => displayMovieDetails(response))
		.catch(err => console.error(err));

 }

function displayMovieDetails (response) {
	console.log(response);
	if ((response.Poster || response.Title || response.Year || response.Runtime || response.Director || response.Actors || response.Plot) === 'N/A' ){
		console.log(response)
		console.log("missing")
		// getStoredItems();
	} else {
		moviePoster.attr('src', response.Poster);
		movieTitle.text(response.Title);
		releaseDate.text(response.Year);
		runtime.text(`Runtime: ${response.Runtime}`);
		director.text(`Directed By: ${response.Director}`);
		starring.text(`Starring:  ${response.Actors}`)
		synopsis.text(`Synopsis: ${response.Plot}`)
	}

	

} 