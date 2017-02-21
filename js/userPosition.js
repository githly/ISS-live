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
                if(map!=undefined) {
                    if(markerUser!="") {
                        map.panTo(markerUser.getPosition());
                    } else {
                        if(markerSimplon!="") map.panTo(markerSimplon.getPosition());
                    }
                }
            });
}
document.addEventListener("DOMContentLoaded", userPositionReady);
