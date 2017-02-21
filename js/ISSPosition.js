"use strict";

const callISSPositionScript = function()
{
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=ISSPositionScriptCallback";
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
const displayISSPosition = function(obj)
{
        document.getElementById('ISSLatitude').textContent = obj.lat.toFixed(4);
        document.getElementById('ISSLongitude').textContent = obj.lng.toFixed(4);
}
const ISSPositionScriptCallback = function(data)
{
    let obj = new POSITION(0,0);
    if(data.message==="success") {
        obj.setLat(parseFloat(data.iss_position['latitude']));
        obj.setLng(parseFloat(data.iss_position['latitude']));
        displayISSPosition(obj);
        if(map!=undefined) addMarker("iss", obj);
    }
}
document.addEventListener("DOMContentLoaded",function(e)
        {
            callISSPositionScript();
            setInterval(callISSPositionScript, 1000);
            document.getElementById("recenterISS").addEventListener("click", function(e)
                    {
                        if(map!=undefined) map.panTo(markerISS.getPosition());
                    });
        });
