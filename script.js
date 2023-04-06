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


var today = dayjs()
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
	getStreaming(choosenMovie);
}


function getStoredItems() {
	var nameStore = localStorage.getItem('name', nameStore);
	var yearStore = localStorage.getItem('year', yearStore);
	var genreStore = localStorage.getItem('genre', genreStore);
 console.log('yes')
	movieAPICall(yearStore, genreStore);

}

function movieAPICall(year, genre) {
	// const options = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
	// 		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	// 	}
	// };

	// fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
	// 	.then(response => response.json())
	// 	.then(response => console.log(response))
	// 	.catch(err => console.error(err));

	// const optionsb = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
	// 		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	// 	}
	// };

	// fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/lists', optionsb)
	// 	.then(response => response.json())
	// 	.then(response => console.log(response))
	// 	.catch(err => console.error(err));

	// const optionsc = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
	// 		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	// 	}
	// };

	const optionsd = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};


	fetch(`https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&genre=${genre}&startYear=${year}&endYear=${2022}`, optionsd)
		.then(response => response.json())
		.then(response => randomMovie(response))
		.catch(err => console.error(err));

}
//Unsplash API

// const accessKey = 'zMuuOQCazY49v22R_yBjWGu_68ZE3qmVG7V011pysrg';

// // Set up the search query
// const query = 'Mexican Food';
// const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;

// // Fetch data from the API endpoint and display the first image
// // ID 'foodIMG' set for image div endpoint, tested and works, but currently not in HTML
// fetch(apiUrl)
// 	.then(response => response.json())
// 	.then(data => {
// 		const image = data.results[0];
// 		const img = document.createElement('img');
// 		img.src = image.urls.regular;
// 		img.alt = image.alt_description;
// 		const foodIMG = document.querySelector('#foodIMG');
// 		foodIMG.appendChild(img);
// 	})
// 	.catch(error => console.log(error));

//local storage for the userInput
var userName = localStorage.getItem('name', userName);

localStorage.setItem('name', userName);

//Displays the users name on the restaurant HTML page
addEventListener("DOMContentLoaded", (event) => {
	$('.closing-text').text(`Enjoy your movie, ${userName}`);
});

// Movie availability API gives IMDB rating, availability on streaming services etc. ONLY 100 calls per day though
function getStreaming() {
	
	const options = {
		method: 'GET',
		headers: {
			regions: 'US',
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
		}
	};
	
	fetch('https://watchmode.p.rapidapi.com/title/tt0848228/sources/', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
		
}

// getStreaming();

// function displayMovie(choosenMovie) {

// 	var movieId = choosenMovie.id;

// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
// 			'X-RapidAPI-Host': 'moviesdb5.p.rapidapi.com'
// 		}
// 	};
	
// 	fetch(`https://moviesdb5.p.rapidapi.com/om?i=${movieId}`, options)
// 		.then(response => response.json())
// 		.then(response => displayMovieDetails(response))
// 		.catch(err => console.error(err));

// }

function displayMovieDetails (response) {
	console.log(response);
	moviePoster.attr('src', response.Poster);
	movieTitle.text(response.Title);
	releaseDate.text(response.Year);
	runtime.text(`Runtime: ${response.Runtime}`);
	director.text(`Directed By: ${response.Director}`);
	starring.text(`Starring:  ${response.Actors}`)
	synopsis.text(`Synopsis: ${response.Plot}`)
	

} 