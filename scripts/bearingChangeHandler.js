window.addEventListener("deviceorientation", onHeadingChange);

function redrawArrow() {
  var b = trueBearing - userBearing;
  if (b < 0) { b += 360; }
  arrow.style.transform = 'rotate(' + b + 'deg)';
}

function writeBearing() {
  output.innerHTML = '<p><strong>user bearing is:' + userBearing + '</strong></p>';
}

function onHeadingChange(event) {
  userBearing = event.alpha;

  if (typeof event.webkitCompassHeading !== "undefined") {
    userBearing = event.webkitCompassHeading; //iOS non-standard
  }

  writeBearing();
}

setInterval(redrawArrow, 40);
