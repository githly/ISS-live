"use strict"

const displayUserPosition = function()
{
    document.getElementById("userLatitude").textContent = POS.lat.toFixed(4);
    document.getElementById("userLongitude").textContent = POS.lng.toFixed(4);
}
const userPositionReady = function()
{
    displayUserPosition();
    setInterval(displayUserPosition, 1000);
    document.getElementById("recenterUser").addEventListener("click", function()
            {
                if(map) {
                    if(markerUser.marker) {
                        map.panTo(markerUser.getPos());
                    } else {
                        map.panTo(markerSimplon.getPos());
                    }
                }
            });
}
document.addEventListener("DOMContentLoaded", userPositionReady);
