//What needs to happen and in what order 

//API: Openweather 
//storage : local storage

//get/ display search history 
    //select the city from search history
    //call the function written for get current weather for the present city

//create dashboard
    //displays the last city searched/selected
    //get weather function is called again
//create form inputs
//upon submit add to search history and get weather function called again

//create a get weather fucntion():
    //current weather: cityName, date, icon, temperature, humidity, wind speed and this is depending on weather conditions
    //forcast: 5 day forcast
        //date, time, temperature

var currentCityELement = document.getElementById("location");
var textVal = document.getElementById("text");
var submitBtn = document.getElementById("submit");

// JSON parse stores the information that was stored as a string back to object
var cityName = JSON.parse(localStorage.getItem("location"));
if(!cityName){
    cityName = []
}


//console.log(cityName)
displaylocation();

submitBtn.onclick = function(){
    var place = textVal.value;
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + place + "&APPID=73992cc9ca3be289cda14818a6b5b1e7";
console.log(queryURL)

let count = 0;
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
//console.log(response.list)
//console.log(response.main.temp)
var fiveDayOutlook = {};
//loop through the 5 days and hours given in the API 
// trim the hours and what remains is the 5 day weather forecast with date as the key for accessing the humidity and temp values.
for(var i = 0; i < response.list.length; i++){
    var str = response.list[i].dt_txt
    str = str.substring(0,str.indexOf(' '));
    //fiveDayOutlook
    //console.log(str.substring(0,str.indexOf(' ')));
    var h = response.list[i].main.humidity;
    var c = Math.floor(response.list[0].main.temp - 273.15)

    //if the date is not in the fiveDayOutLook object enter the if statement
    if(fiveDayOutlook.hasOwnProperty(str) === false){
        //add the humidity, temp, and date to fiveDayOutLook
        var tempArr = [h, c, str];
        fiveDayOutlook[str] = tempArr;
        
    }
    

    //if(response.list[i].dt_txt.indexOf("15:00:00") !==-1) {//create html element from data
}

var daysOutLook = Object.values(fiveDayOutlook);
console.log(daysOutLook[0][0]);



var c = Math.floor(response.list[0].main.temp - 273.15)
//console.log(c)

//console.log(h);
var w = response.list[0].wind.speed
//console.log(w);
var wI = response.list[0].weather[0].icon 
//console.log(wI);
var locationName = response.city.name
var str = response.list[0].dt_txt
str = str.substring(0,str.indexOf(' '));

//
$(".temperature").text("Temperature: " + c)
$(".temperature0").text("Temp: " + daysOutLook[0][1]);
$(".temperature1").text("Temp: " + daysOutLook[1][1]);
$(".temperature2").text("Temp: " + daysOutLook[2][1]);
$(".temperature3").text("Temp: " + daysOutLook[3][1]);
$(".temperature4").text("Temp: " + daysOutLook[4][1]);

$(".date").text("Date: " + str)
$("#date0").text("Date: " + daysOutLook[0][2]);
$("#date1").text("Date: " + daysOutLook[1][2]);
$("#date2").text("Date: " + daysOutLook[2][2]);
$("#date3").text("Date: " + daysOutLook[3][2]);
$("#date4").text("Date: " + daysOutLook[4][2]);
//console.log("Temperature: " + c);
$("weather-icon").append ("<img src='http://openweathermap.org/img/wn/"+ response.list[0].weather[0].icon +".png'>")

$(".place").text(locationName);

$(".humidity").text("Humidity: " + h);
$(".humidity0").text("Humidity: " + daysOutLook[0][0]);
$(".humidity1").text("Humidity: " + daysOutLook[1][0]);
$(".humidity2").text("Humidity: " + daysOutLook[2][0]);
$(".humidity3").text("Humidity: " + daysOutLook[3][0]);
$(".humidity4").text("Humidity: " + daysOutLook[4][0]);


$(".wind-speed").text("Wind Speed: " + w);

//$("#date0").text(fiveDayOutlook[0])
console.log(fiveDayOutlook[0]);

  });

    // clears the search field has new input
    textVal.value = "";

    cityName.push(place)

    //JSON stringfy converts objects into a string 
    localStorage.setItem("location", JSON.stringify(cityName))
    displaylocation()
    //console.log(cityName);

}

//this fucntion loops the city name and displays the current city
function displaylocation() {
    currentCityELement.innerHTML = "";

    for(var i = 0; i < cityName.length; i++) {
        var div = document.createElement("div");
        div.textContent = cityName[i];
        currentCityELement.appendChild(div)
    }
}

