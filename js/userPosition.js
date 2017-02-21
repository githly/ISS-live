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
                if(markerUser!="") {
                    map.panTo(markerUser.getPosition());
                } else {
                    if(markerSimplon!="") map.panTo(markerSimplon.getPosition());
                }
            });
}
document.addEventListener("DOMContentLoaded", userPositionReady);
