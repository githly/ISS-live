"use strict"

const displayUserPosition = function()
{
    document.getElementById("userLatitude").textContent = LAT.toFixed(4);
    document.getElementById("userLongitude").textContent = LNG.toFixed(4);
}
const userPositionReady = function()
{
    displayUserPosition();
    setInterval(displayUserPosition, 1000);
    document.getElementById("recenterUser").addEventListener("click", function()
            {
                map.panTo(markerUser.getPosition());
            });
}
document.addEventListener("DOMContentLoaded", userPositionReady);
