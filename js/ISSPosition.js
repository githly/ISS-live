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
    if(data.message==="success"){
        let issLat = document.getElementById('ISSLatitude');
        let issLon = document.getElementById('ISSLongitude');
        issLat.textContent = parseFloat(data.iss_position['latitude']).toFixed(4);
        issLon.textContent = parseFloat(data.iss_position['longitude']).toFixed(4);
    }
}
document.addEventListener("DOMContentLoaded",function(e)
        {
            callISSPositionScript();
            setInterval(callISSPositionScript, 1000);
        });
