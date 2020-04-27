var humidity;
var weatherIcon;
var pressure;
var temperature;
var temperatureIcon
var windBearing;
var windSpeed;
var weatherSummary;

window.onload = function() {
  humidity = document.getElementById("current-humidity");
  weatherIcon = document.getElementById("current-icon");
  pressure = document.getElementById("current-pressure");
  temperature = document.getElementById("current-temperature");
  temperatureIcon = document.getElementById("temperature-icon");
  windBearing = document.getElementById("current-wind-bearing");
  windSpeed = document.getElementById("current-wind-speed");
  weatherSummary = document.getElementById("weather-summary");
  weatherInfo = document.getElementById("weather-info");
  sug = document.getElementById("sug");
  info = document.getElementById("info");
  getWeather();
}

function farenheitToCelsius(k) {
  return Math.round((k - 32) * 0.5556 );
}

function humidityPercentage(h) {
  return Math.round(h * 100);
}

function degreesToDirection(degrees) {
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    for (i in angles) {

        if(degrees>= low && degrees < high)
            return angles[i];

        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

function knotsToKilometres(knot) {
  return Math.round( knot * 1.852);
}

var weatherImages = {
  "clear-day": 'assets/images/weather/sun.png',
  "clear-night": 'assets/images/weather/sleep.png',
  "rain": 'assets/images/weather/umbrella.png',
  "snow": 'assets/images/weather/snowing.png',
  "sleet": 'assets/images/weather/snow.png',
  "wind": 'assets/images/weather/hurricane.png',
  "fog": 'assets/images/weather/hazy.png',
  "cloudy": 'assets/images/weather/clouds.png',
  "partly-cloudy-day": 'assets/images/weather/suncloud.png',
  "partly-cloudy-night": 'assets/images/weather/night.png',
  "hail": 'assets/images/weather/hailstorm.png',
  "thunderstorm": 'assets/images/weather/thunder.png',
  "tornado":'assets/images/weather/tornado.png'
}

var getWeather = function() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        showWeather(lat, long)
      })
    }
       else {
            window.alert("Could not get location");
      }
  }
 
  function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object)   
  }

var object;

 function displayWeather(object) {
   humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
    weatherIcon.src = weatherImages[object.currently.icon];
   pressure.innerHTML = "Pressure: " + object.currently.pressure + " mb";
    temperature.innerHTML = farenheitToCelsius(object.currently.temperature) + " C" + " / " + object.currently.temperature + " F";
   temperatureIcon.src = "https://cdn4.iconfinder.com/data/icons/medicons-2/512/thermometer-512.png";
    windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
    windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
    weatherSummary.innerHTML = "Current Location: <br/>" + object.timezone ;
    weatherInfo.innerHTML=object.currently.summary;
    info.innerHTML=object.currently.icon;
    sug.innerHTML=farenheitToCelsius(object.currently.temperature);
    console.log(object);
 }


