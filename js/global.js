class ISSPositions
{
    constructor()
    {
        this.array = [];
    }
    insert(obj)
    {
        this.array.unshift(obj);
        if(this.array.length>3600) this.array.pop();
    }
}
let ISSPos = new ISSPositions();

const SIMPLonLat = 43.342396;
const SIMPLonLng = 5.437168;
class POSITION
{
    constructor()
    {
        this.lat = SIMPLonLat;
        this.lng = SIMPLonLng;
    }
    setLat(latitude)
    {
        this.lat = latitude;
        if(this.lat==0.0) this.lat = 0.0001;
        if(this.lat<-71) this.lat = -71;
        if(this.lat>71) this.lat = 71;
    }
    setLng(longitude)
    {
        this.lng = longitude;
        if(this.lng==0.0) this.lng = 0.0001;
    }
    set(latitude, longitude)
    {
        this.setLat(latitude);
        this.setLng(longitude);
    }
}
let POS = new POSITION(SIMPLonLat, SIMPLonLng);
let SIMPLonMARS = new POSITION(SIMPLonLat, SIMPLonLng);

var map;
var markers = [];
let markerUser = "";
let markerISS = "";
let markerSimplon = "";

let selectMarkers = [];

const PLACES = buildPlaces();
