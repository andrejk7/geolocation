function loadFileToElement()
{
    var xmlHTTP = new XMLHttpRequest();
    try
    {
    xmlHTTP.open("GET", './routes/route3.xml', false);
    xmlHTTP.send(null);
    }
    catch (e) {
        window.alert("Unable to load the requested file.");
        return;
    }
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlHTTP.responseText,"text/xml");

    // console.log(xmlDoc.getElementsByTagName("trkp"));
    mapWaypoints(xmlDoc);
}

function mapWaypoints(xml) {
  var points = xml.getElementsByTagName('trkpt');
  for (var i = 0; i < points.length; i++) {
    var w = {};
    w.latitude = points[i].attributes[0].value;
    w.longitude = points[i].attributes[1].value;
    waypoints.push(w);
  }
  currentTarget = waypoints[0];
}

loadFileToElement();
