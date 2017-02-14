"use strict";
let intervalID;
const getISSPos = function(data){
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=printISSPos";
    document.head.appendChild(script);
}
const initISSPos = function(data){
    printISSPos(data);
    //console.log("toto");
    intervalID = window.setInterval(function(){getISSPos(data)}, 1000);
}
const printISSPos = function(data){
    console.log(data);
    if(data.message==="success"){
        let div = document.getElementById('test');
        let newUl = document.createElement("ul");
        div.innerHTML = null;
        let ul = div.appendChild(newUl);
        let key;
        for(key in data.iss_position){
            ul.innerHTML += "<li>"+data.iss_position[key]+"</li>";
        }
        //let li = ul.appendChild(newLi);
        //li.append("Longitude: "+data.iss_position.longitude+", Latitude: "+data.iss_position.latitude);
        div.style.color = "white";
        div.style.zIndex = 10;
    }
}
document.addEventListener("DOMContentLoaded",function() {
    //  document.getElementById('dataLoading').addEventListener("click",function(event){
    let script = document.createElement("script");
    script.src = "http://api.open-notify.org/iss-now.json?callback=initISSPos";
    document.head.appendChild(script);
    //script.parentNode.removeNode(script);
    event.preventDefault();
    //});
});
