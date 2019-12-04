function formatTime(time) {
  let date = time.getDate();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    hours = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[time.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[time.getMonth()];
  return `${day}, ${date} ${month}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatTime(currentTime);

function convertTempFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#currentTemp");
  farenheitTemp.innerHTML = "54";
}

let farenheit = document.querySelector("#farenheitLink");
farenheit.addEventListener("click", convertTempFarenheit);

function convertTempCelcius() {
  let celciusTemp = document.querySelector("#currentTemp");
  celciusTemp.innerHTML = "12";
}

let celcius = document.querySelector("#celciusLink");
celcius.addEventListener("click", convertTempCelcius);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityElement = document.querySelector("#displayCity");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "498800558a7c5bd6e9bc3ec1ccb9adfe";
  let citySearchResults = cityInput.value;
  let apiSearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchResults}&units=metric&appid=${apiKey}`;

  function displayWeather(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    let temperatureElement = document.querySelector("#currentTemp");
    let description = response.data.weather[0].description;
    console.log(description);
    let descriptionElement = document.querySelector("#weatherDescription");
    temperatureElement.innerHTML = `${temperature}`;
    descriptionElement.innerHTML = `${description}`;
  }
  axios.get(apiSearchUrl).then(displayWeather);
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

function displayCurrentPositionWeather(position) {
  let lat = Math.round(position.coords.latitude);
  console.log(lat);
  let lon = Math.round(position.coords.longitude);
  console.log(lon);
  let apiKey = "498800558a7c5bd6e9bc3ec1ccb9adfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCurrentPositionWeather);
}
navigator.geolocation.getCurrentPosition(displayCurrentPositionWeather);

let currentWeatherButton = document.querySelector("#btnCurrentLocation");
currentWeatherButton.addEVentListener(
  "click",
  displayCurrentPositionWeather,
  displayWeather
);
