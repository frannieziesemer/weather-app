function formatDate(timestamp) {
  let time = new Date(timestamp);
  let date = time.getDate();

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
  return `${formatTime(timestamp)}, ${day} ${date} ${month} `;
}

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#displayCity").innerHTML = response.data.name;

  celciusTemperature = response.data.main.temp;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector("#currentTemp").innerHTML = Math.round(
    celciusTemperature
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
}

function displayForecast(response) {
  console.log(response.data.list[0]);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h5>
        ${formatTime(forecast.dt * 1000)}
      </h5>
      <img class="forecastImg" src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="">
      <div>
          ${Math.round(forecast.main.temp)}°
      </div>
    </div>`;
  }
}

function searchCity(city) {
  let apiKey = "498800558a7c5bd6e9bc3ec1ccb9adfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

function convertTempFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celciusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}

function convertTempCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  tempElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", convertTempFarenheit);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", convertTempCelcius);

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnCurrentLocation");
currentLocationButton.addEventListener("click", retreiveCurrentLocation);

searchCity("Berlin");
