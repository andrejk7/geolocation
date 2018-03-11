window.addEventListener("deviceorientation", onHeadingChange);

function redrawArrow() {
  var b = trueBearing - userBearing;
  if (b < 0) { b += 360; }
  arrow.style.transform = 'rotate(' + b + 'deg)';
  writeBearing(b);
}

function writeBearing(b) {
  output.innerHTML = '<p><strong>bearing is:' + b + '</strong></p>';
}

function onHeadingChange(event) {
  userBearing = event.alpha;

  if (typeof event.webkitCompassHeading !== "undefined") {
    userBearing = event.webkitCompassHeading; //iOS non-standard
  }
}

setInterval(redrawArrow, 40);
