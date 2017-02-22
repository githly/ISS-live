"use strict";
let failurePosition = true;

const callISSPositionScript = function()
{
    failurePosition = true;
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=ISSPositionScriptCallback";
    document.head.appendChild(script);
    document.head.removeChild(script);
}
const displayISSPosition = function(obj)
{
    document.getElementById('ISSLatitude').textContent = obj.lat.toFixed(4);
    document.getElementById('ISSLongitude').textContent = obj.lng.toFixed(4);
}
const ISSPositionScriptCallback = function(data)
{
    failurePosition = false;
    if(data.message==="success") {
        let obj = new POSITION();
        obj.setLat(parseFloat(data.iss_position['latitude']));
        obj.setLng(parseFloat(data.iss_position['latitude']));
        displayISSPosition(obj);
        if(map) addMarker("iss", obj);
    } else {
        console.log(data);
    }
    setTimeout(callPositionScript, 1000);
}
const callPositionScript = function()
{
    if(failurePosition) {
        console.info("Attempting to start ISSPosition script call");
        displayTime(Math.floor((new Date().getTime())/1000));
        document.getElementById("ISSLatitude").textContent = "XX.XXXX";
        document.getElementById("ISSLongitude").textContent = "XXX.XXXX";
    }
    callISSPositionScript();
}

document.addEventListener("DOMContentLoaded",function(e)
        {
            callPositionScript();
            setInterval(function()
                    {
                        callPositionScript();
                    }, 70000);

            document.getElementById("recenterISS").addEventListener("click", function(e)
                    {
                        if(map!=undefined) map.panTo(markerISS.getPosition());
                    });
        });
