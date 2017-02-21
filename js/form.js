'use strict'

const emptySelect = function(list)
{
    while(list.options.length > 1) {
        list.remove(1);
    }
}
const resetSelectMarkers = function()
{
    let obj;
    selectMarkers = [];
    const n = parseInt(localStorage.getItem("selectMarkers"));
    for(let i=0; i<n; i++) {
        obj = new POSITION();
        obj.setLat(localStorage.getItem("markerLat"+i));
        obj.setLng(localStorage.getItem("markerLng"+i));
        selectMarkers.push(obj);
    }

    let list = document.getElementById("markers");
    emptySelect(list);

    for(let i in selectMarkers) {
        document.getElementById("markers").options.add(new Option("Marker " + i, i));

        document.getElementById('markers').addEventListener("change", function(e)
                {
                    let list = document.getElementById("markers");
                    let IndexSelect = list.options[list.selectedIndex].value;

                    let obj;
                    if (IndexSelect != "city"){
                        obj = selectMarkers[IndexSelect];
                    } else {
                        obj = SIMPLonMARS;
                    }

                    document.getElementById("latitude").value = obj.lat;
                    document.getElementById("longitude").value = obj.lng;
                });// End Change
    }
}

// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(e)
        {
            for(let i in PLACES) {
                document.getElementById("countries").options.add(new Option(PLACES[i].country, i));
            }

            resetSelectMarkers();

            document.getElementById('countries').addEventListener("change", function(e)
                    {
                        let contries = document.getElementById("countries");
                        let cities = document.getElementById("cities");
                        emptySelect(cities);

                        let sel = list.options[list.selectedIndex].value;
                        if(sel != "country") {
                            let array = PLACES[sel].cities;
                            if (array) {
                                var city;
                                for (let i in array) {
                                    city = new Option(array[i].city, i);
                                    cities.options.add(city);
                                }
                            }
                        } else {
                            document.getElementById("latitude").value = SIMPLonMARS.lat;
                            document.getElementById("longitude").value = SIMPLonMARS.lng;
                        }
                    });// End Change

            document.getElementById('cities').addEventListener("change", function(e)
                    {
                        let countries = document.getElementById("countries");
                        let cities = document.getElementById("cities");
                        let CountrySelect = countries.options[countries.selectedIndex].value;
                        let CitySelect = cities.options[cities.selectedIndex].value;

                        let obj;
                        if (CitySelect != "city"){
                            obj = PLACES[CountrySelect].cities[CitySelect];
                        } else {
                            obj = SIMPLonMARS;
                        }

                        document.getElementById("latitude").value = obj.lat;
                        document.getElementById("longitude").value = obj.lng;
                    });// End Change

            // ecoute la validation du formulaire
            document.getElementById('form').addEventListener("submit", function(e)
                    {
                        e.preventDefault();

                        let obj = new POSITION();
                        obj.setLat(parseFloat(document.getElementById('latitude').value));// Recupere la latitude
                        obj.setLng(parseFloat(document.getElementById('longitude').value)); // Recupere la longitude
                        if(map!=undefined) {
                            addMarker("user", obj);
                            map.panTo(markerUser.getPosition());
                        }
                    });// End Submit

            // clear le formulaire
            document.getElementById('clear').addEventListener("click", function(e)
                    {
                        document.getElementById('form').reset();
                        markerUser = "";
                        if(map!=undefined) map.panTo(markerSimplon.getPosition());
                    }); // End Clear

            // Vider le local Storage
            document.getElementById('storage').addEventListener("click", function(e)
                    {
                        localStorage.clear();
                        localStorage.setItem("selectMarkers", 0);
                        localStorage.setItem("ISSPositions", 0);
                        resetSelectMarkers();
                        PANELS.loadConfigs();
                    }); // End Storage

        }); // End DOMContentLoaded
