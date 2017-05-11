/**
 * Created by jammyyang on 5/10/17.
 */

// var totalOptions = options;
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


