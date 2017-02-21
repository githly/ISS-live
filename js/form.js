'use strict'

const resetSelectMarkers = function()
{
    let obj;
    selectMarkers = [];
    const n = parseInt(localStorage.getItem("selectMarkers"));
    for(let i=0; i<n; i++) {
        obj = {};
        obj.lat = localStorage.getItem("markerlat"+i);
        obj.lng = localStorage.getItem("markerlng"+i);
        selectMarkers.push(obj);
    }

    let list = document.getElementById("markers");
    while(list.options.length > 1) {
        list.remove(1);
    }
    for(let i in selectMarkers) {
        document.getElementById("markers").options.add(new Option("Marker " + i, i));

        document.getElementById('markers').addEventListener("change", function(e)
                {
                    let list = document.getElementById("markers");
                    let IndexSelect = list.options[list.selectedIndex].value;
                    if (IndexSelect != "city"){
                        let latitude = selectMarkers[IndexSelect].lat;
                        let longitude = selectMarkers[IndexSelect].lng;
                        document.getElementById("latitude").value = latitude;
                        document.getElementById("longitude").value = longitude;
                    } else {
                        document.getElementById("latitude").value = SIMPLonLat;
                        document.getElementById("longitude").value = SIMPLonLng;
                    }
                });// End Change
    }
}

// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(e)
        {
            const PLACES = buildPlaces();
            for(let i in PLACES) {
                document.getElementById("countries").options.add(new Option(PLACES[i].country, i));
            }

            document.getElementById('countries').addEventListener("change", function(e)
                    {
                        let list = e.target;
                        let modelList = document.getElementById("cities");
                        while(modelList.options.length) {
                            modelList.remove(0);
                        }
                        modelList.options.add(new Option("-- City --", "city"));

                        let sel = list.options[list.selectedIndex].value;
                        if(sel != "country") {
                            let cities = PLACES[sel].cities;
                            if (cities) {
                                var city;
                                for (let i in cities) {
                                    city = new Option(cities[i].city, i);
                                    modelList.options.add(city);
                                }
                            }
                        } else {
                            document.getElementById("latitude").value = SIMPLonLat;
                            document.getElementById("longitude").value = SIMPLonLng;
                        }
                    });// End Change

            document.getElementById('cities').addEventListener("change", function(e)
                    {
                        let list = document.getElementById("countries");
                        let listC = document.getElementById("cities");
                        let CountrySelect = list.options[list.selectedIndex].value;
                        let CitySelect = listC.options[listC.selectedIndex].value;
                        if (CitySelect != "city"){
                            let latitude = PLACES[CountrySelect].cities[CitySelect].lat;
                            let longitude = PLACES[CountrySelect].cities[CitySelect].lon;
                            document.getElementById("latitude").value = latitude;
                            document.getElementById("longitude").value = longitude;
                        } else {
                            document.getElementById("latitude").value = SIMPLonLat;
                            document.getElementById("longitude").value = SIMPLonLng;
                        }
                    });// End Change

            // ecoute la validation du formulaire
            document.getElementById('form').addEventListener("submit", function(e)
                    {
                        e.preventDefault();
                        LAT = parseFloat(document.getElementById('latitude').value);// Recupere la latitude
                        LNG = parseFloat(document.getElementById('longitude').value); // Recupere la longitude
                        addMarker("user", {lat: LAT, lng: LNG});
                        map.panTo(markerUser.getPosition());
                    });// End Submit

            // clear le formulaire
            document.getElementById('clear').addEventListener("click", function(e)
                    {
                        document.getElementById('form').reset();
                        markerUser = "";
                        map.panTo(markerSimplon.getPosition());
                    }); // End Clear

            // Vider le local Storage
            document.getElementById('storage').addEventListener("click", function(e)
                    {
                        localStorage.clear();
                        localStorage.setItem("selectMarkers", 0);
                        resetSelectMarkers();
                        setPanelsConfig();
                    }); // End Storage

        }); // End DOMContentLoaded
