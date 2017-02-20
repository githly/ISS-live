"use strict"

const userPositionReady = function()
{
    document.getElementById("userLatitude").textContent = latitude.toFixed(4);
    document.getElementById("userLongitude").textContent = longitude.toFixed(4);
    setInterval(function()
            {
                document.getElementById("userLatitude").textContent = latitude.toFixed(4);
                document.getElementById("userLongitude").textContent = longitude.toFixed(4);
            }, 1000);
}
document.addEventListener("DOMContentLoaded", userPositionReady);
