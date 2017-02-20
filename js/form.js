'use strict'

// Demarre le Js quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function(event) {
    // ecoute la validation du formulaire
    document.getElementById('form').addEventListener("submit", function(e)
            {
                e.preventDefault();
                LAT = parseFloat(document.getElementById('latitude').value);// Recupere la latitude
                LNG = parseFloat(document.getElementById('longitude').value); // Recupere la longitude
            });// End Submit

    const PLACES = buildPlaces();
    for(let i in PLACES) {
        document.getElementById("countries").options.add(new Option(PLACES[i].country, i));
    }

    document.getElementById('countries').addEventListener("change", function (e){
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

    document.getElementById('cities').addEventListener("change", function (e)
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

    // clear le formulaire
    document.getElementById('clear').addEventListener("click", function(e)
            {
                document.getElementById('form').reset();
            }); // End Click
}); // End DOMContentLoaded
