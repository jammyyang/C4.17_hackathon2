<?php
header("Access-Control-Allow-Origin: *");

if(empty($_GET['lat'])){
    $_GET['lat'] = 34.2364;
}

if(empty($_GET['lon'])){
    $_GET['lon'] = -117.6590;
}
if(empty($_GET['radius'])){
    $_GET['radius'] = 150;
}

require_once('unirest-php/src/Unirest.php');
$response = Unirest\Request::get("https://trailapi-trailapi.p.mashape.com/?lat={$_GET['lat']}&limit=12&lon={$_GET['lon']}&radius={$_GET['radius']}",
    array(
        "X-Mashape-Key" => "ZuznoNfktdmshBlpfoXELOmwwRHsp1ljBH7jsn6zEzOUYtqdYp",
        "Accept" => "text/plain"
    )
);
print($response->raw_body);
?>