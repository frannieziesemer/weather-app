function formatTime(time) {
  let date = time.getDate();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  return `${hours}:${minutes}, ${day} ${date} ${month} `;
}

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatTime(currentTime);

function convertTempFarenheit(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#currentTemp");
  farenheitTemp.innerHTML = "54";
}

// let farenheit = document.querySelector("#farenheitLink");
// farenheit.addEventListener("click", convertTempFarenheit);

function convertTempCelcius() {
  let celciusTemp = document.querySelector("#currentTemp");
  celciusTemp.innerHTML = "12";
}

let celcius = document.querySelector("#celciusLink");
celcius.addEventListener("click", convertTempCelcius);

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#displayCity").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentHighTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#currentLowTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#currentWind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentHumidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document
    .querySelector("#currentIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("currentIcon")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "498800558a7c5bd6e9bc3ec1ccb9adfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "498800558a7c5bd6e9bc3ec1ccb9adfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function retreiveCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnCurrentLocation");
currentLocationButton.addEventListener("click", retreiveCurrentLocation);

searchCity("Berlin");
