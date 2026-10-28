const API_KEY = "Use Your Weather API Key";

/*===============================
          DOM Elements
================================*/
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feelslike");
const humidityElement = document.getElementById("humidity");
const descriptionElement = document.getElementById("description")
const errorElement = document.getElementById("error");
const input = document.getElementById("searchInput");
const loadingElement = document.getElementById("loading");
const weatherIcon = document.getElementById("weathericon");
const wind = document.getElementById("wind");
const warning = document.getElementById("warning");
const aqiElement = document.getElementById("aqi");
const aqiStatus = document.getElementById("aqiStatus");
const pressure = document.getElementById("pressure");
const sunRise = document.getElementById("sunrise");
const sunSet = document.getElementById("sunset");
const weatherCard = document.getElementById("weatherCard");
const foreCastContainer = document.getElementById("forecast-container");

/*=========================================
        Search Weather on Button Click
=========================================*/
const searchBtn = document.getElementById("searchbtn");
searchBtn.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    if(!value) {
        warning.textContent = "Please Enter The Value"
        return
    }
    warning.textContent = ""
    input.value = ""
    getWeather(value)
})


/*==========================================
        Search Weather on Enter Key
===========================================*/
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){    
        const value = input.value.trim().toLowerCase();
        if(!value) {
            warning.textContent = "Please Enter The Value"
            return
        }
        warning.textContent = ""
        input.value = ""
        getWeather(value)
    }
})


/*=================================================
        Fetch Weather Data and Update the UI
==================================================*/
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    loadingElement.textContent = "Loading";
    try{
    
        // fetch current weather data
        const response = await fetch(url);

        if(!response.ok){
           throw new Error("City Not Found");
        }

        const data = await response.json()
       
        // Extract required weather information
        const weatherInfo = {
            city : data.name,
            temperature : data.main.temp,
            feelsLike : data.main.feels_like,
            humidity : data.main.humidity,
            description : data.weather[0].description,
            icon : data.weather[0].icon,
            windSpeed : data.wind.speed,
            pressure : data.main.pressure,
            sunrise : data.sys.sunrise,
            sunset : data.sys.sunset
        }

        const lon = data.coord.lon;
        const lat = data.coord.lat;

        // Format sunrise and sunseet time
        const sunriseTime = new Date(weatherInfo.sunrise*1000).toLocaleTimeString("en-IN", {
            hour : "2-digit",
            minute : "2-digit"
        })
        const sunsetTime = new Date(weatherInfo.sunset*1000).toLocaleTimeString("en-IN", {
            hour : "2-digit",
            minute : "2-digit"
        })

        // Fetch Air Quality Data
        const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        const aqiResponse = await fetch(aqiUrl);
        if(!aqiResponse.ok){
            throw new Error("AQI Not Found");
        }
        const aqiData = await aqiResponse.json();
        const aqi = aqiData.list[0].main.aqi;

        // Update UI on Weather Condition
        const weatherType = getWeatherType(weatherInfo.icon);
        weatherCard.className = `weather-card ${weatherType}`

        // Fetch Five-Day Forecast Data
        const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        

        const forecastResponse = await fetch(forecastUrl);
        if(!forecastResponse.ok){
            throw new Error("No Forecast Data");
        }
        const forecastData = await forecastResponse.json();

        const dailyForeCast = {};

        // Group Forecast Data By Date
        forecastData.list.forEach(item => {
           const date = new Date(item.dt * 1000);
           const datekey = date.toLocaleDateString("en-IN");
           if(!dailyForeCast[datekey]){
            dailyForeCast[datekey] = [];
           }

            dailyForeCast[datekey].push(item);
        });

        const dailyData = []
    
        Object.entries(dailyForeCast).forEach(([date, forecasts]) => {
            
            // Calculate Daily High and Low Temperatures
            const temperatures = forecasts.map(item => item.main.temp);

            const high = Math.max(...temperatures);
            const low = Math.min(...temperatures);
            
            dailyData.push({
                date,
                high,
                low,
                icon: forecasts[0].weather[0].icon,
                description: forecasts[0].weather[0].description
            })

    });

    // Render Daily Forecast Data Cards
        foreCastContainer.innerHTML = "";
        dailyData.slice(0, 5).forEach(day => {

        const card = document.createElement("div");
    
        card.innerHTML = `
            <h3>${day.date}</h3>
    
            <img 
                src="https://openweathermap.org/img/wn/${day.icon}@2x.png"
                alt="${day.description}"
            >
    
            <p>${day.description}</p>
    
            <p>High: ${Math.round(day.high)}°C</p>
    
            <p>Low: ${Math.round(day.low)}°C</p>
        `;
    
        foreCastContainer.appendChild(card);
    });
       

    // Display Current Weather Details
        const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

        errorElement.textContent = ""
        cityElement.textContent = weatherInfo.city;
        temperatureElement.textContent = `${Math.round(weatherInfo.temperature)}°C`;
        feelsLikeElement.textContent = `${Math.round(weatherInfo.feelsLike)}°C`;
        humidityElement.textContent = `${weatherInfo.humidity}%`;
        descriptionElement.textContent = weatherInfo.description;
        weatherIcon.src = iconUrl;
        weatherIcon.style.visibility = "visible";
        wind.textContent = `${weatherInfo.windSpeed} m/s`;
        aqiElement.textContent = `${aqi}`;
        aqiStatus.textContent = getAqiStatus(aqi)
        pressure.textContent = weatherInfo.pressure;
        sunRise.textContent = ` ${sunriseTime}`;
        sunSet.textContent = ` ${sunsetTime}`;
    
    } catch(error) {

        // Handle API and Network Errors
        errorElement.textContent = error.message;
        cityElement.textContent = "";
        temperatureElement.textContent = "";
        feelsLikeElement.textContent = "";
        humidityElement.textContent = "";
        descriptionElement.textContent = "";
        weatherIcon.src = "";
        weatherIcon.style.visibility = "hidden";
        wind.textContent = "";
        aqiElement.textContent = "";
        aqiStatus.textContent = "";
        pressure.textContent = "";
        sunRise.textContent = "";
        sunSet.textContent = ""
        foreCastContainer.innerHTML = "";

    } finally{
        // Hide Loading Indicator
        loadingElement.textContent = ""
    }
    
}

/*===============================
        Get Air Quality Status
================================*/
function getAqiStatus(aqi){
    switch (aqi){
        case 1:
            return "Good";
            
        case 2:
            return "Fair";

        case 3:
            return "Moderate";  

        case 4:
            return "Poor";

        case 5:
            return "Very Poor";
    }
}

/*================================================
        Determine Weather Type From Icon Code
=================================================*/
function getWeatherType(icon){
   const code = Number(icon.slice(0,2));

   if(code === 1){
      return "clear";
   }  else if(code >= 2 && code <= 4){
      return "clouds";
   }  else if(code === 9 || code === 10){
      return "rain";
   }  else if(code === 11){
      return "thunderstorm";
   }  else if(code === 13){
      return "snow";
   }  else if(code === 50){
       return "mist";
   }
}