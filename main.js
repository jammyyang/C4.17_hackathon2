var trailChoices;
var lat;
var lon;
var radius = 25;

function getLocationTrailWeather() {
    loadMessage();
    getLocation();
}

function loadMessage() {
    alert("waiting for trails");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    console.log("This is the position object", position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getTrailData(lat, lon, radius);
}

function getTrailData(lat, lon, radius){
    var options = {
        url:'server/trailApi.php?lat='+lat+"&lon="+lon+"&radius="+radius,
        success: handleSuccess,
        error: handleError,
        dataType: 'json',
        method: 'get',
        crossDomain: true
    };

    function handleSuccess(result){
        console.log('success', result);
        trailChoices = result;
        getWeatherData();
    }

    function handleError(){
        console.log('error');
    }

    $.ajax(options);
}

function displayTrails () {
    for (var i=0; i<trailChoices.object.places.length; i++) {
        var trailName = object.places[0].name;
    }

}

function getWeatherData (){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?id=5257570&APPID=0b8c405de2b767fa2d70b9d5a5325856",
        method: "GET",
        dataType: 'json',
        // async: true,
        // crossDomain: true,
        success: function(result){
            console.log("This is the weather result", result);
            var weather = result;
            for(var i=0; i<weather.city.length; i++){

                var weather_city = weather.city.name;
                var temp = weather.list[i].main.temp;
                var weatherDiv = $('<div>').text(weather_city);
                $('.').append(weather_city);
                var weather_city = weather.city.country;
                displayWeather(weather_city, )

            }
        }
    });
}


// function displayWeather() {
//     $(#).append(displayWeather);
//
// }

function displayWeather() {


}



function displayTrails () {
    for (var i=0; i<trailChoices.object.places.length; i++) {
        var trailName = trailChoices.object.places[i].name;
        var trailDescription = trailChoices.object.places[i].description;
        var trailCity = trailChoices.object.places[i].location;
    }
}



// var options = {
//     url: 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=0b8c405de2b767fa2d70b9d5a5325856',
//     method: 'GET',
//     dataType: 'json',
//     success: successHandler,
//     error: errorHandler,
// }
//
// function successHandler(result) {
//     console.log('success', result);
// }
//
// function errorHandler () {
//     console.log('error');
// }

// $.ajax(options);


// $.ajax(options);

