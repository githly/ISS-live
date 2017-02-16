"use strict"

let uLat = 0.0;
let uLon = 0.0;

const userPositionReady = function()
{
    document.getElementById("userLatitude").textContent = uLat.toFixed(10);
    document.getElementById("userLongitude").textContent = uLon.toFixed(10);
}
document.addEventListener("DOMContentLoaded", userPositionReady);
