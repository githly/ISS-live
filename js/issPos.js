"use strict";
let intervalID;
const getISSPos = function(data){
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=printISSPos";
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
const initISSPos = function(data){
    printISSPos(data);
    intervalID = window.setInterval(function(){getISSPos(data)}, 1000);
}
const printISSPos = function(data){
    if(data.message==="success"){
        let latitude = document.getElementById('getISSLatitude');
        let longitude = document.getElementById('getISSLongitude');
        latitude.textContent = data.iss_position['latitude'];
        longitude.textContent = data.iss_position['longitude'];
    }
}
document.addEventListener("DOMContentLoaded",function() {
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=initISSPos";
    document.head.appendChild(script);
    event.preventDefault();
});
