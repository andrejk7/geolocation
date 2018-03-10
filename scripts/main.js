//global vars
var output = document.getElementById("out");
var arrow = document.getElementById("arrow");
var locationOutput = document.getElementById("loc");
var directionOutput = document.getElementById("dir");
var userBearing;
var userPosition;
var currentTarget = {
  //цементара Усје, ако некој го интригира
  latitude: 41.9534282,
  longitude: 21.4760617
}

function updateDirection() {
  if (!userPosition) { return; }
  var lat1  = userPosition.coords.latitude;
  var lon1 = userPosition.coords.longitude;
  var lat2 = currentTarget.latitude;
  var lon2 = currentTarget.longitude;
  var bear = bearing(lat1, lon1, lat2, lon2);
  directionOutput.innerHTML = '<p><strong>Direction: ' + bear + '</p></strong>';
}

setInterval(updateDirection, 1000);
