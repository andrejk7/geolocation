window.addEventListener("deviceorientation", onHeadingChange);

function redrawArrow() {
  arrow.style.transform = 'rotate(' + userBearing + 'deg)';
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
