let hourformat = false;

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
    displayTime(data.response[0].risetime);
    displayDuration(data.response[0].risetime);
    document.getElementById("duration").textContent = data.response[0].duration + " seconds";
}

const convertDate = function(d)
{
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
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
    let min = d.getMinutes();
    let sec = d.getSeconds();
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
    let time = d;
    let hour = Math.floor(time/3600);
    time = time%3600;
    let min = Math.floor(time/60);
    time = time%60;
    let sec = time;
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

const ISSPassTimeReady = function()
{
    callISSPassTimeScript(0.0,0.0);
}
document.addEventListener("DOMContentLoaded", ISSPassTimeReady);
