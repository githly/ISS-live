"use strict";

let intervalID;
const getISSPos = function(data)
{
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=printISSPos";
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
const initISSPos = function(data)
{
    printISSPos(data);
    intervalID = window.setInterval(function(){getISSPos(data)}, 1000);
}
const printISSPos = function(data)
{
    if(data.message==="success"){
        let latitude = document.getElementById('ISSLatitude');
        let longitude = document.getElementById('ISSLongitude');
        latitude.textContent = parseFloat(data.iss_position['latitude']).toFixed(4);
        longitude.textContent = parseFloat(data.iss_position['longitude']).toFixed(4);
    }
}
document.addEventListener("DOMContentLoaded",function()
        {
            let script = document.createElement("script");
            script.src = "http://api.open-notify.org/iss-now.json?callback=initISSPos";
            document.head.appendChild(script);
            event.preventDefault();
        });
