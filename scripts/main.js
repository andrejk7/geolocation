//global vars
var output = document.getElementById("out");
var arrow = document.getElementById("arrow");
var locationOutput = document.getElementById("loc");
var directionOutput = document.getElementById("dir");
var userBearing;
var userPosition;
var currentTarget = {
  //City mall, ако некој го интригира
  latitude: 42.0046515,
  longitude: 21.3905192
}
var trueBearing;
var waypoints = [];

function updateDirection() {
  if (!userPosition) { return; }
  var lat1  = userPosition.coords.latitude;
  var lon1 = userPosition.coords.longitude;
  var lat2 = currentTarget.latitude;
  var lon2 = currentTarget.longitude;
  trueBearing = bearing(lat1, lon1, lat2, lon2);
  var d = distance(lat1, lon1, lat2, lon2);
  directionOutput.innerHTML = '<p><strong>Abs direction: ' + trueBearing + '</p></strong>' +
                              '<p><strong>Distance: ' + d + '</p></strong>' +
                              '<p><strong>Target: lon ' + lon2 + ' lat ' + lat2 + '</p></strong>';
}

setInterval(updateDirection, 1000);
