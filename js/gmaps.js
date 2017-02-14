function initMap() {
  var SIMPLonMARS = {
      lat: 43.342052,
      lng: 5.438830
  };

    var mapOptions = {
        zoom: 18,
        center: SIMPLonMARS,
        disableDefaultUI: true
    }
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);



  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(SIMPLonMARS, map);


// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}
}
