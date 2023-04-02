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

