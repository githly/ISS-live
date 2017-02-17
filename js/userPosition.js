"use strict"

let uLat = 0.0;
let uLon = 0.0;

const userPositionReady = function()
{
    document.getElementById("userLatitude").textContent = uLat.toFixed(4);
    document.getElementById("userLongitude").textContent = uLon.toFixed(4);
}
document.addEventListener("DOMContentLoaded", userPositionReady);
