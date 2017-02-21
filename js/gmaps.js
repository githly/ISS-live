// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'),
            {
                center: SIMPLonMARS,
                zoom: 2,
                disableDefaultUI: true
            });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(e)
            {
                addMarker("userclick", e.latLng);
                map.panTo(markerUser.getPosition());
            });

    // Adds a marker at the center of the map.
    addMarker("default", SIMPLonMARS);
}

const insertNewUserMarker = function(n, lat, lng)
{
    let lat2;
    let lng2;
    for(let i=0; i<n; i++) {
        lat2 = localStorage.getItem("markerlat"+i);
        lng2 = localStorage.getItem("markerlng"+i);
        if(lat==lat2 && lng==lng2) return false;
    }
    localStorage.setItem("markerlat"+n, LAT);
    localStorage.setItem("markerlng"+n, LNG);
    localStorage.setItem("selectMarkers", n+1);
    return true;
}

// Adds a marker to the map and push to the array.
function addMarker(index, location)
{
    let n = parseInt(localStorage.getItem("selectMarkers"));
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    switch(index) {
        case "userclick":
            markerUser = marker;
            LAT = location.lat();
            LNG = location.lng();
            insertNewUserMarker(n, LAT,LNG);
            break;
        case "user":
            markerUser = marker;
            LAT = location.lat;
            LNG = location.lng;
            insertNewUserMarker(n, LAT,LNG);
            break;
        case "default":
            markerSimplon = marker;
            break;
        case "iss":
            markerISS = marker;
            ISSPositions.unshift(location);
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
    resetSelectMarkers();
}

function setMapOnAll(map)
{
    for (var i in markers) {
        markers[i].setMap(map);
    }
}
