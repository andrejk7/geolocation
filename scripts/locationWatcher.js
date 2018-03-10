// var output = document.getElementById("out");
// var arrow = document.getElementById("arrow");
// var userBearing = 0;
var lastPosition;
var passed = 0;
var distThresh = 0.001;

function success(position) {
  if (!lastPosition) {
    lastPosition = position;
  };

  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;

  // userBearing = bearing(
  //   lastPosition.coords.latitude,
  //   lastPosition.coords.longitude,
  //   latitude,
  //   longitude
  // );

  var bear = bearing(latitude, longitude, 41.9534282, 21.4760617);
  bear = getRelativeBearing(bear, userBearing);
  //km
  var d = distance(latitude, longitude, 41.9534282, 21.4760617) || 0;

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

  // console.log(position);
  // console.log(userBearing);

  output.innerHTML = '</strong></p><p><strong>user bearing is:' + userBearing + '</strong></p>';
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

setInterval(geoFindMe, 500, {timeout: 499});

window.addEventListener("deviceorientation", onHeadingChange);

function onHeadingChange(event) {
  userBearing = event.alpha;

  if (typeof event.webkitCompassHeading !== "undefined") {
    userBearing = event.webkitCompassHeading; //iOS non-standard
  }

  // console.log('heading: ' + heading);
}

// var geo_options = {
//   enableHighAccuracy: false,
//   maximumAge        : 1000,
//   timeout           : 999
// };

// var wpid = navigator.geolocation.watchPosition(success, error, geo_options);
