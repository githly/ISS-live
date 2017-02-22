'use strict'

const emptySelect = function(list)
{
    while(list.options.length > 1) {
        list.remove(1);
    }
}
const resetSelectMarkers = function()
{
    selectMarkers.reload();
    let list = document.getElementById("markers");
    emptySelect(list);

    for(let i in selectMarkers.array) {
        list.options.add(new Option("Marker " + i, i));

        list.addEventListener("change", function(e)
                {
                    let IndexSelect = e.target.options[e.target.selectedIndex].value;

                    let obj = new POSITION();
                    if (IndexSelect != "marker"){
                        obj = selectMarkers.array[IndexSelect];
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

                        let countrySelected = countries.options[countries.selectedIndex].value;
                        if(countrySelected != "country") {
                            let array = PLACES[countrySelected].cities;
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

                        let obj = new POSITION();
                        if (CitySelect != "city"){
                            obj = PLACES[CountrySelect].cities[CitySelect];
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
                        addMarker("user", obj);
                        if(map) map.panTo(markerUser.getPos());
                    });// End Submit

            // clear le formulaire
            document.getElementById('clear').addEventListener("click", function(e)
                    {
                        document.getElementById('form').reset();
                        markerUser.clear();
                        if(map) map.panTo(markerSimplon.getPos());
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
