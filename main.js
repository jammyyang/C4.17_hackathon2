
/**
 * Open Weather API
 */
var trailChoices;


function getTrailData(){
    var options = {
        url:'http://localhost:8888/server/trailApi.php?lat=33.6839&lon=-117.7947&radius=25',
        success: handleSuccess,
        error: handleError,
        dataType: 'json',
        method: 'get'
        // data: {
        //     lat:33.6839,
        //     lon: -117.7947,
        //     radius:25
        // }
    };

    function handleSuccess(result){
        console.log('success', result);
        trailChoices = result;
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
        url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=0b8c405de2b767fa2d70b9d5a5325856",
        method: "GET",
        dataType: 'json',
        // async: true,
        // crossDomain: true,
        success: function(result){
            console.log("This is the weather result", result);
        }
    });
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



