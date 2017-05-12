var trailChoices;
var lat;
var lon;
var radius = 25;
var trailTemps = [];

function getLocationTrailWeather() {
    loadMessage();
    getLocation();
}

function loadMessage() {
    $("#loadIntro").modal("show");
}

setTimeout(function(){
    $("#loadIntro").modal("hide");
}, 3000);

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
        success: handleTrailSuccess,
        error: handleError,
        dataType: 'json',
        method: 'get',
        crossDomain: true
    };

    function handleTrailSuccess(result){
        console.log('success', result);
        trailChoices = result.places;
        displayCards();


    }

    function handleError(){
        console.log('error');
    }

    $.ajax(options);
}

function displayCards () {
    for (var i=0; i<trailChoices.length; i++) {
        var trailName = trailChoices[i].name;
        var cityTemps = trailTemps[i];
        console.log('city temps,', cityTemps);
        var cardColumn = $('<div>', {
            class: "col-sm-3"
        });

        var cardDiv = $('<div>', {
            class: "pic"
        });

        var imgDiv = $('<img>', {
            src: "https://c1.staticflickr.com/7/6204/6047319257_b27c1be597_m.jpg"
        });

        var picBottomDiv = $('<div>', {
            class: "picBottom"
        });


        var trailNameDiv = $('<div>', {
            class: "trailName d-inline",
            text: trailName
        });


        var trailTempDiv = $('<div>', {
            class: "trailTemp d-inline",
            text: cityTemps
        });

        picBottomDiv.append(trailNameDiv, trailTempDiv);
        cardDiv.append(imgDiv, picBottomDiv);
        cardColumn.append(cardDiv);
        $('.row').append(cardColumn);
        getWeatherData(trailChoices[i],trailTempDiv);
    }


}
function convertDegreesKToF(kTemp){
    return kTemp * 9/5 - 459.67;
}

function getWeatherData (trail,displayElement){


    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + trail.city + ",us&APPID=0b8c405de2b767fa2d70b9d5a5325856",
        method: "GET",
        dataType: 'json',
        // async: true,
        // crossDomain: true,
        success: function(result){
            console.log("This is the weather result", result.main.temp);
            trailTemps.push(result.main.temp);
            var degreesSymbol = $("<sup>",{
                html:'&#8457;',
                class: 'degreesSymbol'
            });
            displayElement.text(Math.floor(convertDegreesKToF(result.main.temp)));
            displayElement.append(degreesSymbol)
            var weatherIcon = $("<img>",{
                src: "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png",
                class: 'weatherIcon'
            });
            displayElement.append(weatherIcon);
            console.log(trail);
            //displayElement.append();

        }
    })

    console.log(trailTemps);
}



// function displayWeather() {
//     $(#).append(displayWeather);
//
// }


// function displayTrails () {
//     for (var i=0; i<trailChoices.object.places.length; i++) {
//         var trailName = trailChoices.object.places[i].name;
//         var trailDescription = trailChoices.object.places[i].description;
//         var trailCity = trailChoices.object.places[i].location;
//     }
// }



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

