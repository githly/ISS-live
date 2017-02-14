const callISSPassTimeScript = function(lat, lon)
{
    if(lat == 0) lat++;
    if(lon == 0) lon++;
    const script = document.createElement("script");
    script.setAttribute("src", "http://api.open-notify.org/iss-pass.json?lat="+lat.toFixed(1)+"&lon="+lon.toFixed(1)+"&n=1&callback=ISSPassTimeScriptCallback");
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
}
const ISSPassTimeScriptCallback = function(data)
{
    console.log(data);
    document.getElementById("TEST").children[1].textContent = data.response[0].duration;
    //CallUNIXConvertTimestampScript(data.response[0].risetime);
}

const CallUNIXConvertTimestampScript = function(timestamp)
{
    const script = document.createElement("script");
    script.setAttribute("src", "http://www.convert-unix-time.com/api?timestamp="+timestamp+"&format=german&timezone=Paris&returnType=jsonp&callback=UNIXConvertTimestampScriptCallback");
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
}
const UNIXConvertTimestampScriptCallback = function(data)
{
    console.log(data);
    document.getElementById("TEST").children[3].textContent = data.localDate;
}

const ISSPassTimeReady = function()
{
    callISSPassTimeScript(0.0,0.0);
}
document.addEventListener("DOMContentLoaded", ISSPassTimeReady);
