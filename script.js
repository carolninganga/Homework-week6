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

var searchHistory = document.getElementById("searchHistory");
var textVal = document.getElementById("text");
var submitBtn = document.getElementById("submit");
var clearSearchHistoryBtn = document.getElementById("clear");

// JSON parse stores the information that was stored as a string back to object
var cityName = JSON.parse(localStorage.getItem("location"));
if (!cityName) {
    cityName = []
}


//console.log(cityName)
displaySearchHistory();

submitBtn.onclick = function () {
    let count = 0;
    var place = textVal.value;

    displayFiveDay(place)

    // clears the search field has new input
    textVal.value = "";

    cityName.unshift(place)

    //JSON stringfy converts objects into a string 
    localStorage.setItem("location", JSON.stringify(cityName))
    displaySearchHistory()
    //console.log(cityName);

    clearSearchHistoryBtn.onclick = function() {
        $("#searchHistory").empty();
    }
}

function displayFiveDay(place) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&APPID=73992cc9ca3be289cda14818a6b5b1e7";
    //var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi/forcast?q=" + place + "&APPID=73992cc9ca3be289cda14818a6b5b1e7";

   
    console.log(queryURL)
    //console.log(queryURL2)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        $("#forecast").empty();
        var list = response.list
        for (var i = 0; i < list.length; i++) {
            var hour = list[i].dt_txt.split(" ")[1].split(":")[0]
            if (parseInt(hour) === 12) {
                console.log(list[i])

                var div = $("<div>");
                //div.setAttribute
                div.css("display", "inline-block")
                div.css("width", "19%")
                div.css("background-color", "light-blue")
                
                var date = $("<p>").text(list[i].dt_txt.split(" ")[0])
                var icon = $("<img>")
                icon.attr("src", "https://openweathermap.org/img/wn/" + list[i].weather[0].icon + ".png")
                var humidity = $("<p>").text("humidity: " + list[i].main.humidity + "%");
                var c = Math.floor(response.list[0].main.temp - 273.15) + " &#8451;";
                var temperature = $("<p>").html("temp: " + c);
                console.log(c);

                div.append(date, icon, humidity, temperature);
                div.css({"background-color": "dodgerblue", "margin-right":"1%", "padding-left": "5px"});
                $("#forecast").append(div)
            }
        }

        //console.log(response.list)
        //console.log(response.main.temp)
        var fiveDayOutlook = {};
        //loop through the 5 days and hours given in the API 
        // trim the hours and what remains is the 5 day weather forecast with date as the key for accessing the humidity and temp values.
        // grab the first index using response.list.[i] and date
        for (var i = 0; i < response.list.length; i++) {
            var str = response.list[i].dt_txt
            str = str.substring(0, str.indexOf(' '));
            //fiveDayOutlook
            //console.log(str.substring(0,str.indexOf(' ')));
            var h = response.list[i].main.humidity;
            var c = Math.floor(response.list[0].main.temp - 273.15)

            //if the date is not in the fiveDayOutLook object enter the if statement
            if (fiveDayOutlook.hasOwnProperty(str) === false) {
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
        str = str.substring(0, str.indexOf(' '));

        //elements for the current location div
        $(".temperature").html("Temperature: " + c + " &#8451;")
        $(".date").text("Date: " + str)
        //console.log("Temperature: " + c);
        $(".weather-icon").append("<img src='http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png'>")
        $(".place").text(locationName);
        $(".humidity").text("Humidity: " + h + "%");
        $(".wind-speed").text("Wind Speed: " + w);

        console.log(fiveDayOutlook[0]);

    });
}

//this fucntion loops the city name and displays the current city
function displaySearchHistory() {
    searchHistory.innerHTML = "";

    for (var i = 0; i < cityName.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "searchedLocations")
        div.textContent = cityName[i];
        searchHistory.appendChild(div)
    }
    $(".searchedLocations").css({"background-color": "dodgerblue", "margin-bottom":"2px", "padding-left": "5px"});
}

