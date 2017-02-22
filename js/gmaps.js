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
                if(map) map.panTo(markerUser.getPos());
            });

    // Adds a marker at the center of the map.
    addMarker("default", SIMPLonMARS);

    initDayNightLib();

    new DayNightOverlay({
            map: map
    });
}

// Adds a marker to the map and push to the array.
function addMarker(index, location)
{
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    switch(index) {
        case "userclick":
            marker.setAnimation(google.maps.Animation.DROP);
            markerUser.reset(marker);
            POS.set(location.lat(), location.lng());
            selectMarkers.insert(POS);
            break;
        case "user":
            marker.setAnimation(google.maps.Animation.DROP);
            markerUser.reset(marker);
            POS.set(location.lat, location.lng);
            selectMarkers.insert(POS);
            break;
        case "default":
            markerSimplon.reset(marker);
            marker.addListener("click", function(e)
                    {
                        let win = window.open("http://simplonmars.eu/", "_blank");
                        win.focus();
                    });
            break;
        case "iss":
            markerISS.reset(marker);
            ISSPos.insert(location);
            break;
    }

    marker.addListener("click", function(e)
            {
                map.panTo(marker.getPosition());
            });

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
