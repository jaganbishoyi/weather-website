const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message');
const messageTwo = document.getElementById('weather-info');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    if (!location) {
        return messageOne.textContent = 'You must provide a location';
    }

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Showing weather for ' + data.location;

                const forecast = data.forecast;
                const weather_icons = forecast.weather_icons[0];

                let img = document.createElement("img");
                img.src = weather_icons;
                img.setAttribute("id", "current-weather-icon");
                messageTwo.appendChild(img);

                let weather_descriptions = document.createElement("h5");
                weather_descriptions.innerHTML = forecast.weather_descriptions[0] + "<span id='observation-time'>( Observation time: " + forecast.observation_time + ') </span>';
                weather_descriptions.setAttribute("id", "weather-descriptions");
                messageTwo.appendChild(weather_descriptions);

                const descContent = 'In ' + data.location + ' it is currently ' + forecast.temperature + ' degrees out. It feels like ' + forecast.feelslike + ' degrees. And the humidity is ' + forecast.humidity + '%.';

                let desc = document.createElement("p");
                desc.textContent = descContent;
                desc.setAttribute("id", "descriptions");
                messageTwo.appendChild(desc);

                const locationImageURL = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/' + data.longitude + ',' + data.latitude + ',6,15,30/600x300?before_layer=admin-0-boundary&logo=false&access_token=pk.eyJ1IjoicXdlcnR5amQiLCJhIjoiY2tycDRlMmdkMTFyMDJvcnFzOWMwYW1yciJ9.jA0scF4ruvGXDiQLGiXB0A';
                let locationImage = document.createElement("img");
                locationImage.src = locationImageURL;
                locationImage.className = "img-responsive";;
                messageTwo.appendChild(locationImage);
            }
        });
    });
});