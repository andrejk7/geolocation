var output = document.getElementById("out");
var arrow = document.getElementById("arrow");
var userBearing = 0;
var lastPosition;
var passed = 0;
var distThresh = 0.001;

function success(position) {
  if (!lastPosition) {
    lastPosition = position;
  };

  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  userBearing = bearing(
    lastPosition.coords.latitude,
    lastPosition.coords.longitude,
    latitude,
    longitude
  );

  var bear = bearing(latitude, longitude, 45.0535179, 21.37234803464725);
  //km
  // passed += distance(latitude, longitude, lastPosition.coords.latitude, lastPosition.coords.longitude) || 0;

  // output.innerHTML += '<p><strong>Lat ' + latitude + '° ,Long ' + longitude + '°</strong></p>';
  //
  // var dist = distance(parseFloat(latitude), parseFloat(longitude), 45.0535179, 21.37234803464725);
  //
  // output.innerHTML += '<p><strong>Distance is ' + dist + '</strong></p>';
  //
  // var bear = bearing(parseFloat(latitude), parseFloat(longitude), 45.0535179, 21.37234803464725);
  //
  lastPosition = position;

  // if (distance(latitude, longitude, lastPosition.coords.latitude, lastPosition.coords.longitude) < distThresh) { return; }

  output.innerHTML = '<p><strong>bearing is: ' + userBearing +
    '</strong></p><p><strong>position is:' + position.coords.latitude + ' ' + position.coords.longitude + '</strong></p>';
  arrow.style.transform = 'rotate(' + userBearing + 'deg)';
}

function error() {
  output.innerHTML = "Unable to retrieve your location";
}

function geoFindMe() {

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

// setInterval(geoFindMe, 2000);

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 60000,
  timeout           : 5000
};

var wpid = navigator.geolocation.watchPosition(success, error, geo_options);
