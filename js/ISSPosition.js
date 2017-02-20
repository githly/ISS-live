"use strict";

const callISSPositionScript = function()
{
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=ISSPositionScriptCallback";
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
const ISSPositionScriptCallback = function(data)
{
    let obj = {};
    if(data.message==="success"){
        obj.lat = parseFloat(data.iss_position['latitude']);
        obj.lng = parseFloat(data.iss_position['latitude']);
        let issLat = document.getElementById('ISSLatitude');
        let issLon = document.getElementById('ISSLongitude');
        issLat.textContent = obj.lat.toFixed(4);
        issLon.textContent = obj.lng.toFixed(4);
        addMarker("iss", obj);
    }
}
document.addEventListener("DOMContentLoaded",function(e)
        {
            callISSPositionScript();
            setInterval(callISSPositionScript, 1000);
        });
