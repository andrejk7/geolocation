function success(position) {
  userPosition = position;
  locationOutput.innerHTML = '<p><strong>lon: ' + position.coords.longitude + ' lat: ' + position.coords.latitude + '</strong></p>';
}

function error() {
  locationOutput.innerHTML = "Unable to retrieve your location";
}

function geoFindMe() {

  if (!navigator.geolocation){
    locationOutput.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 2000,
  timeout           : 1999
};

var wpid = navigator.geolocation.watchPosition(success, error, geo_options);

geoFindMe();
