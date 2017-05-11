/**
 * Open Weather API
 */

function call(){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=0b8c405de2b767fa2d70b9d5a5325856",
        method: "GET",
        dataType: 'json',
        // async: true,
        // crossDomain: true,
        success: function(result){
            console.log("This is the result", result);
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
