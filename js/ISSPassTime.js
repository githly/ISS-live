let hourformat = false;
let failurePassTimeID = 0;

function n(n)
{
    return n > 9 ? "" + n: "0" + n;
}

const convertDate = function(d)
{
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = n(d.getDate());
    let hour = d.getHours();
    let pm = false;
    if(hourformat) {
        if (hour > 12) {
            hour -= 12;
            pm = true;
        } else if (hour === 0) {
            hour = 12;
        }
    }
    hour = n(hour);
    let min = n(d.getMinutes());
    let sec = n(d.getSeconds());
    let time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
    if(hourformat) {
        if(pm) {
            time += " PM";
        } else {
            time += " AM";
        }
    }
    return time;
}
const convertDuration = function(d)
{
    let time = Math.abs(d);
    let hour = n(Math.floor(time/3600));
    if(d<0) hour = "-" + hour;
    time = time%3600;
    let min = n(Math.floor(time/60));
    time = time%60;
    let sec = n(time);
    time = hour +":"+ min +":"+ sec;
    return time;
}

const displayTime = function(timestamp)
{
    let datetimestamp = new Date(timestamp*1000);
    document.getElementById("time").textContent = convertDate(datetimestamp);
}
const displayDuration = function(timestamp)
{
    let datenow = new Date();
    let datetimestamp = new Date(timestamp*1000);
    let duration = Math.floor((datetimestamp.getTime() - datenow.getTime())/1000);
    document.getElementById("countdown").textContent = convertDuration(duration);
}

const startISSPassTimeScript = function()
{
    console.info("Attempting to start ISSPassTime script call");
    displayTime(Math.floor((new Date().getTime())/1000));
    document.getElementById("countdown").textContent = "XX:XX:XX";
    document.getElementById("duration").textContent = "XX:XX:XX";
    callISSPassTimeScript();
}
const callISSPassTimeScript = function()
{
    failurePassTimeID = setTimeout(startISSPassTimeScript, 70000);
    const script = document.createElement("script");
    script.setAttribute("src", "http://api.open-notify.org/iss-pass.json?lat="+POS.lat.toFixed(4)+"&lon="+POS.lng.toFixed(4)+"&callback=ISSPassTimeScriptCallback");
    document.head.appendChild(script);
    document.head.removeChild(script);
}
const ISSPassTimeScriptCallback = function(data)
{
    clearTimeout(failurePassTimeID);
    if(data.message=="success") {
        displayTime(data.response[0].risetime);
        displayDuration(data.response[0].risetime);
        document.getElementById("duration").textContent = convertDuration(data.response[0].duration);
    } else {
        console.log(data);
    }
    setTimeout(callISSPassTimeScript, 1000);
}

document.addEventListener("DOMContentLoaded", function(e)
        {
            startISSPassTimeScript();

            document.getElementById("hourformat").addEventListener("click", function(e)
                    {
                        hourformat = !hourformat;
                    });
        });
