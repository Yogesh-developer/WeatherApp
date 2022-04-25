var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var shortNamedays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeather() {
  var cityName = document.getElementById("cityName").value;
  getWeatherData(cityName);
}

function getWeatherData(cityName) {
  var url = "https://weatherdbi.herokuapp.com/data/weather/" + cityName;
  fetch(url)
    .then((res) => res.json())
    .then((json) => putData(json));
}

function putData(json) {
  if (json.status === undefined) {
    var er = document.getElementById("error");
    er.innerText = "";
    var day = document.getElementById("day");
    dayName = json.currentConditions.dayhour;
    dayName = dayName.split(" ");
    day.innerHTML = dayName[0];
    var year = document.getElementById("year");
    var date = new Date();
    date = date.toDateString();
    date = date.split(" ");
    year.innerHTML = date[2] + " " + date[1] + " " + date[3];
    var location = document.getElementById("location");
    locationName = json.region.split(",");
    location.innerText = locationName[0];
    var temp = document.getElementById("size");
    var env = document.getElementById("env");
    temp.innerHTML = json.currentConditions.temp.c + "&degC";
    env.innerHTML = json.currentConditions.comment;
    var perception = document.getElementById("per");
    var humidity = document.getElementById("humi");
    var wind = document.getElementById("wind");

    perception.innerHTML = json.currentConditions.precip;
    humidity.innerHTML = json.currentConditions.humidity;
    wind.innerHTML = json.currentConditions.wind.km + " Km\\Hr";
    var card = document.querySelectorAll(".flex");
    for (var i = 1; i < 5; i++) {
      var cards = card[i - 1].getElementsByTagName("h3");
      cards[0].innerHTML = shortNamedays[days.indexOf(json.next_days[i].day)];
      cards[1].innerHTML = json.next_days[i].max_temp.c + "&deg;C";
    }
    document.getElementById("cityName").value = "";
  } else {
    var er = document.getElementById("error");
    er.innerText = json.message + "*";
    document.getElementById("cityName").value = "";
  }
}
