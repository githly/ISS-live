const SIMPLonLat = 43.342396;
const SIMPLonLng = 5.437168;

const INC = 0.0001;

let LAT = SIMPLonLat;
let LNG = SIMPLonLng;

var map;
var markers = [];
let ISSPositions = [];
let markerUser = "";
let markerISS = "";
let markerSimplon = "";

let selectMarkers = [];

var SIMPLonMARS =
{
    lat: SIMPLonLat,
    lng: SIMPLonLng
};
