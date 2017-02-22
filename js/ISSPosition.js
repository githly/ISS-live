"use strict";
let failurePositionID = 0;

const displayISSPosition = function(obj)
{
    document.getElementById('ISSLatitude').textContent = obj.lat.toFixed(4);
    document.getElementById('ISSLongitude').textContent = obj.lng.toFixed(4);
}

const startISSPositionScript = function()
{
    console.info("Attempting to start ISSPosition script call");
    displayTime(Math.floor((new Date().getTime())/1000));
    document.getElementById("ISSLatitude").textContent = "XX.XXXX";
    document.getElementById("ISSLongitude").textContent = "XXX.XXXX";
    callISSPositionScript();
}
const callISSPositionScript = function()
{
    failurePositionID = setTimeout(startISSPositionScript, 70000);
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=ISSPositionScriptCallback";
    document.head.appendChild(script);
    document.head.removeChild(script);
}
const ISSPositionScriptCallback = function(data)
{
    clearTimeout(failurePositionID);
    if(data.message==="success") {
        let obj = new POSITION();
        obj.setLat(parseFloat(data.iss_position['latitude']));
        obj.setLng(parseFloat(data.iss_position['longitude']));
        displayISSPosition(obj);
        if(map) addMarker("iss", obj);
    } else {
        console.log(data);
    }
    setTimeout(callISSPositionScript, 1000);
}

document.addEventListener("DOMContentLoaded",function(e)
        {
            startISSPositionScript();

            document.getElementById("recenterISS").addEventListener("click", function(e)
                    {
                        if(map!=undefined) map.panTo(markerISS.getPosition());
                    });
        });
