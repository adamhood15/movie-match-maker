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
		
		fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/titleTypes', optionsc)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));

			const optionsd = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': '470bbc37cbmsh159b75e4fb9ceb9p1dd3fbjsn904a4308001a',
					'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
				}
			};
			
			fetch('https://moviesdatabase.p.rapidapi.com/titles?titleType=movie&list=top_rated_250&sort=year.decr&startYear=2000', optionsd)
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(err => console.error(err));
//Unsplash API

const accessKey = 'zMuuOQCazY49v22R_yBjWGu_68ZE3qmVG7V011pysrg';

// Set up the search query
const query = 'Mexican Food';
const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`;

// Fetch data from the API endpoint and display the first image
// ID 'foodIMG' set for image div endpoint, tested and works, but currently not in HTML
fetch(apiUrl)
  	.then(response => response.json())
  	.then(data => {
    	const image = data.results[0];
    	const img = document.createElement('img');
    	img.src = image.urls.regular;
    	img.alt = image.alt_description;
    	const foodIMG = document.querySelector('#foodIMG');
    	foodIMG.appendChild(img);
  	})
  	.catch(error => console.log(error));

//local storage for the userInput
var userName = 'Adam';

localStorage.setItem('name', userName);

//Displays the users name on the restaurant HTML page
addEventListener("DOMContentLoaded", (event) => {
	$('.closing-text').text(`Get ready to chow down, ${userName}`);
});




