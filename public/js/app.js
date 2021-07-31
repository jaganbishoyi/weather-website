const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

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
                console.log(data);
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
            }
        });
    });
});