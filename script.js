const apiKey = 'e2f093c765e5eacc3f15243b94f958ac'; 

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert("Please enter a city");
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error('Forecast not found');
        }
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherData = document.getElementById('weatherData');
    weatherData.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastData = document.getElementById('forecastData');
    forecastData.innerHTML = '';

    const forecastList = data.list;
    for (let i = 0; i < forecastList.length; i += 8) { // 8 intervals per day (3-hour interval * 8 = 24 hours)
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString(undefined, { weekday: 'long' });
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

        forecastData.innerHTML += `
            <div class="forecast-item">
                <h3>${day}</h3>
                <img src="${icon}" alt="${forecast.weather[0].description}">
                <p>Temp: ${forecast.main.temp} °C</p>
                <p>${forecast.weather[0].description}</p>
            </div>
        `;
    }
}


function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    currentTimeElement.textContent = `Current Time: ${timeString}`;
}


setInterval(updateTime, 1000);


setInterval(() => {
    const accessStatus = document.getElementById('accessStatus');
    const randomStatus = Math.random() < 0.8 ? 'Online' : 'Offline';
    accessStatus.textContent = randomStatus;
    if (randomStatus === 'Online') {
        accessStatus.style.color = '#4CAF50'; 
    } else {
        accessStatus.style.color = '#FF5722'; 
    }
}, 3000); 
