if(localStorage.getItem("selectMarkers")==null || localStorage.getItem("ISSPosition")==null) {
    localStorage.clear();
    localStorage.setItem("selectMarkers", 0);
    localStorage.setItem("ISSPosition", 0);
}

class ISSPositions
{
    constructor()
    {
        this.array = new Array();
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
        this.lat = new Number();
        this.lng = new Number();
        this.set(SIMPLonLat,SIMPLonLng);
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
let POS = new POSITION();
let SIMPLonMARS = new POSITION();

class SelectMarkers
{
    constructor()
    {
        this.array = new Array();
        this.load();
    }
    reload()
    {
        this.array = new Array();
        this.load();
    }
    load()
    {
        let obj;
        const n = parseInt(localStorage.getItem("selectMarkers"));
        for(let i=0; i<n; i++) {
            obj = new POSITION();
            obj.setLat(localStorage.getItem("markerLat"+i));
            obj.setLng(localStorage.getItem("markerLng"+i));
            this.array.push(obj);
        }
    }
    insert(obj)
    {
        let lat2;
        let lng2;
        const n = parseInt(localStorage.getItem("selectMarkers"));

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
}
let selectMarkers = new SelectMarkers();

var map;
var imageSIMPLon = 'media/img/simplon.png';
var imageISS = 'media/img/simplon.png';
class Marker
{
    constructor(obj)
    {
        this.marker = undefined;
        this.icon = obj;
    }
    clear()
    {
        this.marker = undefined;
    }
    reset(obj)
    {
        if(this.marker) this.marker.setMap(null);
        this.marker = obj;
        this.marker.setIcon(this.icon);
        if(map) this.marker.setMap(map);
    }
    getPos()
    {
        return this.marker.getPosition();
    }
}
let markerUser = new Marker(null);
let markerISS = new Marker(imageISS);
let markerSimplon = new Marker(imageSIMPLon);

const PLACES = buildPlaces();
