"use strict"

const displayUserPosition = function()
{
    document.getElementById("userLatitude").textContent = latitude.toFixed(4);
    document.getElementById("userLongitude").textContent = longitude.toFixed(4);
}
const userPositionReady = function()
{
    displayUserPosition();
    setInterval(displayUserPosition, 1000);
}
document.addEventListener("DOMContentLoaded", userPositionReady);
