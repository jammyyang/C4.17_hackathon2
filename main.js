var trailChoices;
var lat;
var lon;
var radius = 25;
var trailTemps = [];

// function cityPosition (){
//     var cityInput = $("#cityInput").val();
//     $.ajax({
//         url: "https://maps.googleapis.com/maps/api/geocode/json?&address=" + cityInput,
//         method: "get",
//         dataType: "json",
//         success: function(result){
//             console.log("We have a result", result);
//         },
//         error: function(){
//             console.log("This thing sucks");
//         }
//     })
// }


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
        var random = Math.floor(Math.random() * 24 + 1);
        var trailName = trailChoices[i].name;
        var cityTemps = trailTemps[i];
        var trailLocation = trailChoices[i].city;
        console.log('city temps,', cityTemps);
        var cardColumn = $('<div>', {
            class: "col-sm-3"
        });

        var cardDiv = $('<div>', {
            class: "pic"
        });

        var imgDiv = $('<img>', {
            // src: "https://c1.staticflickr.com/7/6204/6047319257_b27c1be597_m.jpg"
            src: 'trail_image/' + random + '.jpg',
            // class: "imgDiv"
        });


        var picBottomDiv = $('<div>', {
            class: "picBottom"
        });


        var trailNameDiv = $('<div>', {
            class: "trailName d-inline",
            text: trailName + ' - ' + trailLocation
        });


        var trailTempDiv = $('<div>', {
            class: "trailTemp d-inline",
            text: cityTemps
        });

        picBottomDiv.append(trailNameDiv, trailTempDiv);
        cardDiv.append(imgDiv, picBottomDiv);
        // $(imgDiv).css('background-image','url("trail_image/' + ranNum + '.jpg")');
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
    });

    console.log(trailTemps);
}

