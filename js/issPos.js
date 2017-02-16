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
        let divTopLeft = document.getElementById('getISSPos');
        let newUl = document.createElement("ul");
        divTopLeft.innerHTML = null;
        let ulISS = divTopLeft.appendChild(newUl);
        for(let key in data.iss_position){
            ulISS.innerHTML += "<li>"+data.iss_position[key]+"</li>";
        }
        divTopLeft.style.color = "white";
        divTopLeft.style.zIndex = 10;
    }
}
document.addEventListener("DOMContentLoaded",function() {
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=initISSPos";
    document.head.appendChild(script);
    event.preventDefault();
});
