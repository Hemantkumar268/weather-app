# 🌦️ Weather App

A responsive Weather App built with HTML, CSS, JavaScript, Bootstrap, and the OpenWeatherMap API. Search for any city to view current weather conditions, air quality information, sunrise and sunset times, and a five-day weather forecast.

## 🚀 Live Demo

**Live Website:** [View Weather App](PASTE_YOUR_NETLIFY_URL_HERE)

## 🎥 Project Demo

Watch the project demonstration video:

[▶️ Watch Weather App Demo](PASTE_YOUR_GITHUB_VIDEO_URL_HERE)

## ✨ Features

- 🔍 **City Search:** Search for weather information by city name.
- 🌡️ **Current Weather:** View temperature, feels-like temperature, and weather conditions.
- 💧 **Humidity:** Check the current humidity level.
- 💨 **Wind Speed:** View wind speed information.
- 🌫️ **Air Quality Index (AQI):** Check air quality information and its status.
- 🌅 **Sunrise & Sunset:** View local sunrise and sunset times.
- 📅 **Five-Day Forecast:** View daily high and low temperatures and weather conditions.
- 🌤️ **Dynamic Weather UI:** Background styles change according to weather conditions.
- ⏳ **Loading & Error Handling:** Display loading states and useful error messages.
- 📱 **Responsive Design:** Designed for desktop and mobile screens.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- OpenWeatherMap API

## 📸 Screenshots

Add screenshots of your application here.

```text
screenshots/
├── home.png
├── current-weather.png
└── forecast.png
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project Folder

```bash
cd weather-app
```

### 3. Get an API Key

Create an account on [OpenWeatherMap](https://openweathermap.org/api) and obtain an API key.

### 4. Configure Your API Key

Open `script.js` and replace the placeholder with your own API key:

```javascript
const API_KEY = "YOUR_OPENWEATHER_API_KEY";
```

Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key.

### 5. Run the Application

Open `index.html` in your browser, or use the VS Code Live Server extension.

**Note:** The application requires an active API key with access to the requested OpenWeatherMap services.

## 🔐 API Key Security

- Never commit your personal API key to a public GitHub repository.
- Keep the placeholder in the source code you publish.
- For production deployments, use a server-side API endpoint and store the API key in environment variables.
- If a key is accidentally exposed, replace or revoke it and review its usage.

## 📂 Project Structure

```text
weather-app/
├── index.html
├── style.css
├── responsive.css
├── script.js
└── README.md
```

## 🎯 What I Learned

- Fetching data from external APIs using JavaScript.
- Working with asynchronous JavaScript using `async/await`.
- Handling API responses, errors, and loading states.
- Updating the DOM dynamically.
- Processing weather and forecast data.
- Grouping forecast entries by date.
- Building a responsive user interface.
- Using GitHub and Netlify to publish a project.

## 🔮 Future Improvements

- Add geolocation-based weather search.
- Add temperature unit conversion between Celsius and Fahrenheit.
- Improve forecast visualizations.
- Add a weather search history.
- Move API requests to a secure server-side endpoint.

## 👨‍💻 Author

**Hemant Kumar**

---

⭐ If you find this project useful, consider giving the repository a star.
