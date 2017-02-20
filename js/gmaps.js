// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
let ISSPositions = [];
let markerUser = "";
let markerISS = "";
let markerSimplon = "";

var SIMPLonMARS = {
    lat: SimplonLatitude,
    lng: SimplonLongitude
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: SIMPLonMARS,
        zoom: 2,
        disableDefaultUI: true
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker("user", event.latLng);
    });

    // Adds a marker at the center of the map.
    addMarker("default", SIMPLonMARS);
}

// Adds a marker to the map and push to the array.
function addMarker(index, location)
{
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    switch(index) {
        case "user":
            markerUser = marker;
            break;
        case "default":
            markerSimplon = marker;
            break;
        case "iss":
            markerISS = marker;
            ISSPosition.unshift(location);
            if(ISSPositions.length > 3600) {
                ISSPositions.pop();
            }
            break;
    }
    setMapOnAll(null);
    markers = [];
    if(markerUser != "") markers.push(markerUser);
    if(markerSimplon != "") markers.push(markerSimplon);
    if(markerISS != "") markers.push(markerISS);
    setMapOnAll(map);
}

function setMapOnAll(map) {
    for (var i in markers) {
        markers[i].setMap(map);
    }
}
