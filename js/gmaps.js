

function initMap() {
  var mapOptions = {
    zoom: 18,
    center: {lat: 43.342052, lng: 5.438830},
    disableDefaultUI: true
  }
  var map = new google.maps.Map(document.getElementById("map"),
       mapOptions);
}
