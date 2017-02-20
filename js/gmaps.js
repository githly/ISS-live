

function initMap() {
  var mapOptions = {
    zoom: 2,
    center: {lat: SimplonLatitude, lng: SimplonLongitude},
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById("map"),
       mapOptions);
}
