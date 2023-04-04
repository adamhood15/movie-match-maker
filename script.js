var nameInputEl = $('#name');
var addressInputEl = $('#address');
var submitButtonEl = $('#submit');
var distance = $('#distanceSlider');

















// Restaurant API

// latitude and longitude required
function travelAdvisorAPI(lat, lon, dist) {

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
			'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
		}
	};

var urlLatLon = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}&limit=30&currency=USD&distance=${dist}&open_now=true&lunit=km&lang=en_US&min_rating=3`;


fetch(urlLatLon, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}

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
    	// foodIMG.appendChild(img);
  	})
  	.catch(error => console.log(error));


//Grabs geolocation latitude and longitude for trip advisory api
function geoAPICall() {
	const geoAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=pearland&limit=10&appid=a0334750ce53b3a2b2d0193e97ee40fc'

	fetch(geoAPI) 
		.then(response => response.json())
		.then(data => {
			var lat = data[0].lat;
			var lon = data[0].lon;

			travelAdvisorAPI(lat, lon);
		})
		.catch(err => console.error(err));

}

geoAPICall();

//local storage for the userInput
var userName = 'Adam';

localStorage.setItem('name', userName);

//Displays the users name on the restaurant HTML page
addEventListener("DOMContentLoaded", (event) => {
	$('.closing-text').text(`Get ready to chow down, ${userName}`);
});




