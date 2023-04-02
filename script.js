// Restaurant API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '340b5afe51msh9cbcd179dcfe229p1431edjsn47853944768f',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};

// latitude and longitude required

var urlLatLon = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US';


fetch(urlLatLon, options)
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