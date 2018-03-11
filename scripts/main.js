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
var selectedWaypointIndex = -1;
var distThresh = 5; //5 meters threshold

function updateDirection() {
  if (!userPosition) { return; }
  if (selectedWaypointIndex === waypoints.length) {
    return directionOutput.innerHTML = '<p><strong>You have arrived</strong></p>';
  }
  var lat1  = userPosition.coords.latitude;
  var lon1 = userPosition.coords.longitude;
  var lat2 = selectedWaypointIndex > -1 ? waypoints[selectedWaypointIndex].latitude : currentTarget.latitude;
  var lon2 = selectedWaypointIndex > -1 ? waypoints[selectedWaypointIndex].longitude : currentTarget.longitude;
  trueBearing = bearing(lat1, lon1, lat2, lon2);
  var d = distance(lat1, lon1, lat2, lon2);
  if (d * 1000 < distThresh) {
    selectedWaypointIndex++;
  }
  directionOutput.innerHTML = '<p><strong>Distance: ' + d * 1000 + ' m</p></strong>' +
                              '<p><strong>Target: lon ' + lon2 + ' lat ' + lat2 + '</p></strong>' +
                              '<p><strong>Waypoint index: ' + selectedWaypointIndex + '</p></strong>';
}

setInterval(updateDirection, 1000);
