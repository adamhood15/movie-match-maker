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
	// movieStatsAPICall(choosenMovie)
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
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};

	fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

	const optionsb = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};

	fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/lists', optionsb)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

	const optionsc = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};

	const optionsd = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
			'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
		}
	};


	fetch(`https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&genre=${genre}&year=${year}`, optionsd) // &endYear=${yearEnd-1}
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
// 470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a
//Movie availability API gives IMDB rating, availability on streaming services etc. ONLY 100 calls per day though
function movieStatsAPICall(title) {
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${title}&country=us&show_type=movie&output_language=en`, options)
	.then(response => response.json())
	.then(response => movieStats(response))
	.catch(err => console.error(err));
}

function movieStats (data) {
	var movieStuff = data[0]
	movieStuff.title;
	movieStuff.year
	movieStuff.overview
	movieStuff.directors
	movieStuff.runtime
console.log(data)
}