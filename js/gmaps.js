// In the following example, markers appear when the user clicks on the map.

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

    initDayNightLib();

    new DayNightOverlay({
            map: map
    });
}

const insertNewUserMarker = function(n, obj)
{
    let lat2;
    let lng2;
    for(let i=0; i<n; i++) {
        lat2 = localStorage.getItem("markerLat"+i);
        lng2 = localStorage.getItem("markerLng"+i);
        if(obj.lat==lat2 && obj.lng==lng2) return false;
    }
    localStorage.setItem("markerLat"+n, obj.lat);
    localStorage.setItem("markerLng"+n, obj.lng);
    localStorage.setItem("selectMarkers", n+1);
    resetSelectMarkers();
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
            POS.set(location.lat(), location.lng());
            insertNewUserMarker(n, POS);
            break;
        case "user":
            markerUser = marker;
            POS.set(location.lat, location.lng);
            insertNewUserMarker(n, POS);
            break;
        case "default":
            markerSimplon = marker;
            break;
        case "iss":
            markerISS = marker;
            ISSPos.insert(location);
            break;
    }
    //Resets markers
    setMapOnAll(null);
    markers = [];
    if(markerUser != "") markers.push(markerUser);
    if(markerSimplon != "") markers.push(markerSimplon);
    if(markerISS != "") markers.push(markerISS);
    setMapOnAll(map);

    //Create Polyline on the map
    var flightPath = new google.maps.Polyline({
        path: ISSPos.array,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    flightPath.setMap(map);
}

function setMapOnAll(map)
{
    for (var i in markers) {
        markers[i].setMap(map);
    }
}


